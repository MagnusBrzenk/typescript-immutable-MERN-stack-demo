if (!!process.env.DISABLE_DEBUG) delete process.env.DEBUG;
import debug from "debug";
import { debugPrefixString } from "__CONSTANTS";

try {
    if (!!window && !!window.localStorage) window.localStorage.setItem("debug", debugPrefixString + "*");
} catch (err) {
    // console.log(err);
}

/**
 * Wrapper around debugger-return function
 * @param debugPrefixer
 */
export function __debug(debugCustomPrefixer: string): debug.IDebugger {
    if (!!process.env.DISABLE_DEBUG) delete process.env.DEBUG;
    return debug(debugPrefixString + debugCustomPrefixer);
}
