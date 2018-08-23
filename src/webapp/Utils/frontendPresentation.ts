/**
 * Key Params for Frontend Layout, Theme, etc.
 */
namespace FrontendPresentation {
    /**
     * Development/Debugging Params
     */
    export const bDebug: boolean = process.env.NODE_ENV !== "production";

    /**
     * Window-Size Params
     */
    export const lowerScreenSize: number = 500;
    export const upperScreenSize: number = 1000;

    /**
     * Logic to grow feed's side margins linearly from minMargin to maxMargin
     * over range of `lowerScreenSize px < screen width < upperScreenSize px`
     */
    export function getFeedMarginSize() {
        const minMargin: number = 0;
        const maxMargin: number = 400;
        let marginSize: number = minMargin;
        if (window.innerWidth > lowerScreenSize) {
            marginSize =
                minMargin +
                ((window.innerWidth - lowerScreenSize) * (maxMargin - minMargin)) / (upperScreenSize - lowerScreenSize);

            // console.log("window.innerWidth", window.innerWidth, lowerScreenSize);
            // console.log("marginSize", marginSize);

            if (marginSize < minMargin) marginSize = minMargin;
            if (marginSize > maxMargin) marginSize = maxMargin;
        }
        return marginSize;
    }

    /**
     * Logic to grow fontSize linearly from minFontSizePercent to maxFontSizePercent
     * over range of `lowerScreenSize px < screen width < upperScreenSize px`
     */
    export function getDynamicFontSizePrcnt(size: "tiny" | "small" | "medium" | "large" | "xlarge" | "huge" = "small") {
        let baseSize: number = 0;
        if (size === "small") baseSize = 10;
        if (size === "medium") baseSize = 20;
        if (size === "large") baseSize = 30;
        if (size === "xlarge") baseSize = 40;
        if (size === "huge") baseSize = 50;

        const minFontSizePercent: number = 0 + baseSize;
        const maxFontSizePercent: number = 80 + baseSize;
        let fontSizePercent: number = maxFontSizePercent;
        if (window.innerWidth > lowerScreenSize) {
            fontSizePercent =
                minFontSizePercent +
                ((window.innerWidth - 500) / (upperScreenSize - lowerScreenSize)) *
                    (maxFontSizePercent - minFontSizePercent);
            if (fontSizePercent < minFontSizePercent) fontSizePercent = minFontSizePercent;
            if (fontSizePercent > maxFontSizePercent) fontSizePercent = maxFontSizePercent;
        }
        return fontSizePercent;
    }

    /**
     * Theme Params
     */
    export const primaryColorDark: string = "#356859";
    export const primaryColor: string = "#37966F";
    export const primaryColorLight: string = "#B9E4C9";
    export const secondaryColor: string = "#FD5523";
    export const displayWhite: string = "#f5fffa";
}

export default FrontendPresentation;
