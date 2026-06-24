const assert = require("node:assert/strict");

const runtimeModules = {
	"@codemirror/autocomplete": require("@codemirror/autocomplete"),
	"@codemirror/language": require("@codemirror/language"),
	"@lezer/highlight": require("@lezer/highlight"),
	"@lezer/lr": require("@lezer/lr"),
};

let initPlugin;
let unmountPlugin;
let registered;
let unregistered;

const editorLanguages = {
	get() {
		return null;
	},
	register(name, extensions, caption, load) {
		registered = { name, extensions, caption, load };
	},
	unregister(name) {
		unregistered = name;
	},
};

global.acode = {
	require(id) {
		return id === "editorLanguages" ? editorLanguages : runtimeModules[id];
	},
	setPluginInit(_id, init) {
		initPlugin = init;
	},
	setPluginUnmount(_id, unmount) {
		unmountPlugin = unmount;
	},
};
global.window = { acode: global.acode };

require("../dist/main.js");

async function test() {
	await initPlugin("file:///plugin/", null, {});

	assert.equal(registered.name, "autohotkey");
	assert(registered.extensions.includes("ahk"));

	const support = registered.load();
	assert.equal(support.language.name, "autohotkey");
	assert.equal(support.language.parser.parse("MsgBox('ok')").length, 12);

	await unmountPlugin();
	assert.equal(unregistered, "autohotkey");

	console.log("Validated Acode registration and CodeMirror language loading.");
}

test().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
