import { completeFromList } from "@codemirror/autocomplete";
import { html } from "@codemirror/lang-html";
import { javascript, javascriptLanguage } from "@codemirror/lang-javascript";
import { Prec, EditorState } from "@codemirror/state";
import { LRLanguage, LanguageSupport, syntaxTree } from "@codemirror/language";
import { parseMixed } from "@lezer/common";
import { styleTags, tags as t } from "@lezer/highlight";
import { parser } from "./parser";

const htmlSupport = html({ matchClosingTags: false });
const javascriptSupport = javascript();

function containsHtmlMarkup(input, from, to) {
  return /<\/?[A-Za-z][\w:-]*(?:\s|\/?>)|<!--|<!doctype/i.test(input.read(from, to));
}


function startsInHtmlComment(state, pos, side) {
  const line = state.doc.lineAt(pos);
  const firstNonSpace = line.from + (/^\s*/.exec(line.text)[0].length);
  const target = Math.max(pos, firstNonSpace);
  let node = syntaxTree(state).resolveInner(target, side);

  for (let current = node; current; current = current.parent) {
    if (current.name === "HtmlComment") return true;
    if (current.name === "Template") break;
  }

  return false;
}

const htmlCommentTokens = Prec.highest(EditorState.languageData.of((state, pos, side) => {
  return startsInHtmlComment(state, pos, side)
    ? [{ commentTokens: { block: { open: "<!--", close: "-->" } } }]
    : [];
}));

function ejsContentScriptRanges(input, from, to) {
  const source = input.read(from, to);
  const openBraces = [];
  const excluded = new Set();

  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (char === "{") {
      openBraces.push(index);
    } else if (char === "}") {
      if (openBraces.length) openBraces.pop();
      else excluded.add(index);
    }
  }

  for (const index of openBraces) excluded.add(index);
  if (!excluded.size) return [{ from, to }];

  const ranges = [];
  let start = 0;
  for (let index = 0; index < source.length; index++) {
    if (!excluded.has(index)) continue;
    if (start < index) ranges.push({ from: from + start, to: from + index });
    start = index + 1;
  }
  if (start < source.length) ranges.push({ from: from + start, to });
  return ranges.filter((range) => /\S/.test(input.read(range.from, range.to)));
}

/**
 * EJS Language Definition for Lezer
 *
 * Patterns:
 * - <%# ... %> : Comments
 * - <%= ... %> : Output (escaped)
 * - <%-  ... %>: Output (unescaped)
 * - <% ... %>  : Code blocks
 * - <%%       : Literal <%
 */

export const ejsLanguage = LRLanguage.define({
  name: "ejs",
  parser: parser.configure({
    wrap: parseMixed((node, input) => {
      if (node.name === "Template") {
        return {
          parser: htmlSupport.language.parser,
          overlay: (overlayNode) => {
            return overlayNode.name === "Text" &&
              containsHtmlMarkup(input, overlayNode.from, overlayNode.to);
          },
        };
      }

      if (node.name === "Content" && node.node.parent.name !== "EjsComment") {
        const overlay = ejsContentScriptRanges(input, node.from, node.to);
        return overlay.length ? { parser: javascriptLanguage.parser, overlay } : null;
      }

      return null;
    }),
    props: [
      styleTags({
        "EjsComment HtmlComment": t.comment,
        "ExprStart BlockStart TagEnd": t.keyword,
        LiteralStart: t.string,
        EscapedTag: t.string,
      })
    ]
  }),
  languageData: {
    commentTokens: {
      block: { open: "<%#", close: "%>" }
    },
    indentOnInput: /^\s*(?:else|catch|finally)\b/,
  }
});

/**
 * EJS Language Support for CodeMirror
 */
export function ejs() {
  return new LanguageSupport(ejsLanguage, [
    htmlCommentTokens,
    htmlSupport.support,
    javascriptSupport.support,
    ejsLanguage.data.of({ autocomplete: completeFromList(ejsAutocomplete) })
  ]);
}

/**
 * Autocomplete suggestions for EJS tags
 */
const ejsAutocomplete = [
  { label: "<% %>", type: "keyword", boost: 99 },
  { label: "<%= %>", type: "keyword", boost: 98 },
  { label: "<%-  %>", type: "keyword", boost: 97 },
  { label: "<%# %>", type: "comment", boost: 96 },
];

export const ejsMode = {
  name: "ejs",
  caption: "EJS",
  extensions: ["ejs"],
  load: ejs,
};