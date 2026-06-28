import { completeFromList } from "@codemirror/autocomplete";
import { html, htmlLanguage } from "@codemirror/lang-html";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { parseMixed } from "@lezer/common";
import { styleTags, tags as t } from "@lezer/highlight";
import { parser } from "./parser";

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
    wrap: parseMixed((node) => {
      if (node.name !== "Template") return null;
      return {
        parser: htmlLanguage.parser,
        overlay: (overlayNode) => overlayNode.name === "Text",
      };
    }),
    props: [
      styleTags({
        "EjsComment CommentStart EjsComment/Content EjsComment/TagEnd": t.comment,
        "ExprStart BlockStart EjsExpression/TagEnd EjsBlock/TagEnd": t.keyword,
        LiteralStart: t.string,
        EscapedTag: t.string,
        "EjsExpression/Content EjsBlock/Content": t.string,
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
  const htmlSupport = html({ matchClosingTags: false });

  return new LanguageSupport(ejsLanguage, [
    htmlSupport.support,
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
