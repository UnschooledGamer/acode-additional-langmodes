import { completeFromList } from "@codemirror/autocomplete";
import {
	delimitedIndent,
	foldInside,
	foldNodeProp,
	indentNodeProp,
	LanguageSupport,
	LRLanguage,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import { parser } from "./parser";
import {
	builtins,
	builtInVariables,
	commands,
	controlKeywords,
} from "./keywords";

const configuredParser = parser.configure({
	props: [
		styleTags({
			"LineComment BlockComment": t.comment,
			Directive: t.meta,
			HotstringHeader: t.special(t.string),
			HotkeyHeader: t.special(t.labelName),
			"LabelOrProperty/Identifier": t.labelName,
			"FunctionDeclaration/Identifier": t.function(t.definition(t.variableName)),
			"FunctionCall/Identifier": t.function(t.variableName),
			"ClassDeclaration/Identifier": t.definition(t.className),
			BuiltinVariableName: t.constant(t.variableName),
			PercentIdentifier: t.special(t.variableName),
			Identifier: t.variableName,
			String: t.string,
			Number: t.number,
			Boolean: t.bool,
			"classKw extendsKw newKw": t.keyword,
			ControlKeyword: t.controlKeyword,
			DefinitionKeyword: t.definitionKeyword,
			BuiltinFunctionName: t.standard(t.function(t.variableName)),
			CommandName: t.standard(t.function(t.variableName)),
			"andKw orKw notKw": t.logicOperator,
			OperatorToken: t.operator,
			"( )": t.paren,
			"[ ]": t.squareBracket,
			"{ }": t.brace,
			": # PunctuationToken": t.punctuation,
		}),
		indentNodeProp.add({
			Block: delimitedIndent({ closing: "}" }),
			Bracketed: delimitedIndent({ closing: "]" }),
			ArgumentList: delimitedIndent({ closing: ")" }),
			Parenthesized: delimitedIndent({ closing: ")" }),
		}),
		foldNodeProp.add({
			Block: foldInside,
			Bracketed: foldInside,
			ArgumentList: foldInside,
			Parenthesized: foldInside,
		}),
	],
});

export const autoHotkeyLanguage = LRLanguage.define({
	name: "autohotkey",
	parser: configuredParser,
	languageData: {
		commentTokens: {
			line: ";",
			block: { open: "/*", close: "*/" },
		},
		closeBrackets: {
			brackets: ["(", "[", "{", "'", '"'],
		},
		indentOnInput: /^\s*}$/,
		wordChars: "#@$",
	},
});

const completionEntries = [
	...controlKeywords,
	...commands,
	...builtins,
	...builtInVariables,
].map((label) => ({
	label,
	type: controlKeywords.has(label)
		? "keyword"
		: builtInVariables.has(label)
			? "constant"
			: "function",
}));

const autoHotkeyCompletion = autoHotkeyLanguage.data.of({
	autocomplete: completeFromList(completionEntries),
});

export function autoHotkey() {
	return new LanguageSupport(autoHotkeyLanguage, [autoHotkeyCompletion]);
}

export const autoHotkeyMode = {
	name: "autohotkey",
	caption: "AutoHotkey",
	extensions: ["ahk", "ah1", "ah2", "ahk1", "ahk2"],
	load: autoHotkey,
};
