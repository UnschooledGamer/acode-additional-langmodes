import {
	BuiltinFunctionName,
	CommandName,
	andKw,
	breakKw,
	byRefKw,
	caseKw,
	catchKw,
	classKw,
	continueKw,
	defaultKw,
	elseKw,
	exitAppKw,
	exitKw,
	extendsKw,
	falseKw,
	finallyKw,
	forKw,
	globalKw,
	ifKw,
	inKw,
	localKw,
	loopKw,
	newKw,
	notKw,
	orKw,
	returnKw,
	staticKw,
	switchKw,
	throwKw,
	trueKw,
	tryKw,
	untilKw,
	whileKw,
} from "./parser.terms.js";
import { builtins, commands } from "./keywords";

const keywordTerms = new Map([
	["and", andKw],
	["break", breakKw],
	["byref", byRefKw],
	["case", caseKw],
	["catch", catchKw],
	["class", classKw],
	["continue", continueKw],
	["default", defaultKw],
	["else", elseKw],
	["exit", exitKw],
	["exitapp", exitAppKw],
	["extends", extendsKw],
	["false", falseKw],
	["finally", finallyKw],
	["for", forKw],
	["global", globalKw],
	["if", ifKw],
	["in", inKw],
	["local", localKw],
	["loop", loopKw],
	["new", newKw],
	["not", notKw],
	["or", orKw],
	["return", returnKw],
	["static", staticKw],
	["switch", switchKw],
	["throw", throwKw],
	["true", trueKw],
	["try", tryKw],
	["until", untilKw],
	["while", whileKw],
]);

export function specializeIdentifier(value) {
	const word = value.toLowerCase();
	return (
		keywordTerms.get(word) ??
		(builtins.has(word)
			? BuiltinFunctionName
			: commands.has(word)
				? CommandName
				: -1)
	);
}
