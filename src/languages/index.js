import { autoHotkeyMode } from "./autohotkey";
import { communityLanguageModes } from "./community";
import { gitignoreMode } from "./gitignore";
import { zigMode } from "./zig";

import { ejsMode } from "./ejs"

/**
 * Add future language descriptors here. Each descriptor owns its metadata and
 * lazy CodeMirror loader, so adding a mode doesn't require changing plugin
 * lifecycle code.
 */
export const languageModes = [
	autoHotkeyMode,
	zigMode,
	gitignoreMode,
	...communityLanguageModes,
  ejsMode,
];
