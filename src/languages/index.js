import { autoHotkeyMode } from "./autohotkey";

/**
 * Add future language descriptors here. Each descriptor owns its metadata and
 * lazy CodeMirror loader, so adding a mode doesn't require changing plugin
 * lifecycle code.
 */
export const languageModes = [autoHotkeyMode];
