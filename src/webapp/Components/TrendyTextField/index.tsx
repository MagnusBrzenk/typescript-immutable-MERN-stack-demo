import * as React from "react";
import { MagnifyingGlass } from "__COMPONENTS/@FortawesomeWrappers/MagnifyingGlass";
import PREZ from "__UTILS/frontendPresentation";
import genUniqueId from "__UTILS/genUniqueId";

interface IProps {
    height?: number;
    width?: number;
    defaultText?: string;
    fontSizePxls?: number;
    borderRadiusPxls?: number;
    fontFamilyString?: string;
    mainBackgroundColor?: string;
    inputTextBackgroundColor?: string;
    labelContent?: string | JSX.Element;
    inputTextColor?: string;
    bottomBorderColor?: string;
    onTextInputChange?: (wordForSearching: string) => void;
    style?: React.CSSProperties;
    //
    bSmallScreen?: boolean;
    bEditingLocked?: boolean;
    bIsForWordSearch?: boolean;
}
interface IState extends IProps {
    //Props to receive default values:
    defaultText: string;
    bottomBorderColor: string;
}
const defaultBackgroundColor: string = "#7e57c2";

/**
 * Trendy text field with transforming placeholder text
 * NOTE: the internal logic got a bit messy here unfortunately -- it's ok for this app as is, but if you wanted to expand
 * upon it or reuse it elsewhere then it needs to be rebuilt from scratch
 */
export class TrendyTextField extends React.Component<IProps, IState> {
    //
    private trendyTextId: string = "trendy-text-id-" + genUniqueId();
    private inputTextLatestValue: string = "";
    private bSearchingWord: boolean = false;
    private defaultLabelValue: JSX.Element = (
        <span style={{ position: "relative", marginLeft: 20 }}>
            <MagnifyingGlass //
                size="1x"
                color="white"
                style={{
                    //
                    paddingRight: 5,
                    position: "absolute",
                    right: "100%"
                }}
            />
            <span> {"Word Search"} </span>
        </span>
    );

    constructor(props: IProps) {
        super(props);
        this.state = {
            bottomBorderColor: this.props.bottomBorderColor || PREZ.displayWhite,
            fontSizePxls: this.props.fontSizePxls || 26,
            fontFamilyString: this.props.fontFamilyString || '"Dosis", sans-serif',
            borderRadiusPxls: 0,
            inputTextBackgroundColor:
                this.props.inputTextBackgroundColor || this.props.mainBackgroundColor || defaultBackgroundColor,
            mainBackgroundColor: this.props.mainBackgroundColor || defaultBackgroundColor,
            //
            bSmallScreen: this.props.bSmallScreen,
            bEditingLocked: !!this.props.bEditingLocked,
            defaultText: this.props.defaultText || "",
            labelContent: this.props.labelContent || this.defaultLabelValue,
            inputTextColor: this.props.inputTextColor || "white"
        };
    }

    componentDidUpdate(prev: IProps) {
        if (prev !== this.props) {
            this.setState(
                oldState => ({ ...oldState, ...this.props }),
                () => {
                    //Now need to separately update the new input default value ebcause html doesnt do this automatically:

                    const inputElement: HTMLElement | null = document.getElementById(this.trendyTextId);
                    if (!!inputElement) ((inputElement as any) as HTMLInputElement).value = this.state.defaultText;
                }
            );
        }
    }

    render() {
        //PARAMETERIZATIONS
        //Externally determined params
        const {
            fontSizePxls,
            fontFamilyString,
            borderRadiusPxls,
            inputTextBackgroundColor,
            mainBackgroundColor
        } = this.state;
        //Font sizes
        const inputTextFontSizePxls: number = fontSizePxls!;
        const inputToLabelSizeRatio: number = 1.0;
        const labelTextDefaultFontSize: number = inputTextFontSizePxls * inputToLabelSizeRatio;
        //Line heights
        const inputTextLineHeightFactor: number = 1;
        const labelTextLineHeightFactor: number = inputTextLineHeightFactor;
        //Padding
        const textIndentPxls: number = 10;
        const textInputVertPaddingPxls: number = 5;

        //Misc
        const labelDefaultPosYPrcnt = 50;
        const labelTransformScaleFactor: number = 0.5;
        //Transforms
        //NOTE!!! We'll be defining the y-component of a transform3d() translation using a **percentage of the label element's OWN PREVIOUS HEIGHT* (i.e. NOT as a percentage of its parent's height!)
        //Goal: shift label up above text-input box
        const labelTransformedPosY: string = `-${inputTextFontSizePxls * inputTextLineHeightFactor * 0.5 +
            textInputVertPaddingPxls}px`;
        //Change element visibility, colors, etc. so you can see what's going on
        const bDebug = !true;

        // console.log("^^^^^^^^^^^^^^^^^^^^^^");
        // console.log("^^^^^^^^^^^^^^^^^^^^^^");
        // console.log(
        //     "this.state.defaultText",
        //     this.state.defaultText,
        //     ["True", "False"].includes(this.state.defaultText)
        // );
        // console.log("this.state.defaultText", this.state.defaultText);
        // console.log("^^^^^^^^^^^^^^^^^^^^^^");
        // console.log("labelDefaultPosYPrcnt", labelDefaultPosYPrcnt);
        // console.log("labelTransformedPosY", labelTransformedPosY);
        //
        return (
            <div //
                className={"trendy-text-field"}
                // style={{ display: "inline" }}
            >
                <style jsx>{`
                    /* MISC SETUP */
                    *,
                    *::before,
                    *::after {
                        box-sizing: border-box;
                    }

                    /* CLASSES */
                    .trendy-text-field {
                        height: ${(!!this.props.height && this.props.height + "px") || "100%"};
                        width: ${(!!this.props.width && this.props.width + "px") || "100%"};
                        font-family: ${fontFamilyString};
                        background-color: ${!!bDebug ? "pink" : mainBackgroundColor};
                        color: #455a64;
                        --transitionDuration: 300ms;
                        --transitionTF: cubic-bezier(0.645, 0.045, 0.355, 1);
                        --inputTransitionDuration: var(--transitionDuration);
                        --inputTransitionTF: var(--transitionTF);
                    }
                    .trendy-text-input-flex-container {
                        background-color: ${!!bDebug ? "green" : "transparent"};
                        display: flex;
                        align-items: center;
                        // align-items: flex-start;
                        justify-content: center;
                        overflow: hidden;
                        width: 100%;
                        height: 100%;
                    }

                    .trendy-text-input-flex-item {
                        flex: 0 0 80%;
                        max-width: 80%;
                    }

                    .input-text-wrapper {
                        position: relative;
                    }

                    .input-text {
                        /* Positioning */
                        display: block;
                        /* Size */
                        width: 100%;
                        line-height: ${inputTextLineHeightFactor!};
                        padding: ${textInputVertPaddingPxls}px ${textIndentPxls}px;
                        margin: 0;
                        border: none;
                        border-bottom: solid 1px ${this.state.bottomBorderColor};
                        border-radius: ${borderRadiusPxls}px;
                        overflow: visible;
                        /* Font/Color */
                        background-color: ${!!bDebug ? "red" : inputTextBackgroundColor};
                        color: ${this.state.inputTextColor};
                        font-family: inherit;
                        font-size: ${inputTextFontSizePxls}px;
                        font-weight: bold;
                        transition: box-shadow var(--transitionDuration);
                        cursor: ${!!this.state.bEditingLocked ? "default" : "text"};
                    }

                    .input-text:focus {
                        outline: none;
                    }

                    .input-label {
                        /* Size/Positioning */
                        display: inline-block;
                        position: absolute;
                        bottom: ${labelDefaultPosYPrcnt}%;
                        left: ${textIndentPxls}px;
                        line-height: ${labelTextLineHeightFactor!};
                        transform-origin: 0 0;
                        transform: translate3d(0, ${labelDefaultPosYPrcnt}%, 0) scale(1);
                        transition: opacity var(--inputTransitionDuration) var(--inputTransitionTF),
                            transform var(--inputTransitionDuration) var(--inputTransitionTF),
                            visibility 0ms var(--inputTransitionDuration) var(--inputTransitionTF),
                            z-index 0ms var(--inputTransitionDuration) var(--inputTransitionTF);
                        /* Font/Color */
                        background-color: ${!!bDebug ? "rgba(0, 255, 255, 0.5)" : "transparent"};
                        color: ${!!bDebug ? "grey" : "white"};
                        font-family: inherit;
                        font-size: ${labelTextDefaultFontSize}px;
                        font-weight: inherit;
                        white-space: nowrap;
                        width: auto;
                    }

                    .force-label-transformation,
                    .input-text:focus + .input-label,
                    .input-text:not(:placeholder-shown) + .input-label,
                    .input-text:focus:not(:placeholder-shown) + .input-label {
                        display: inline;
                        visibility: visible;
                        z-index: 1;
                        opacity: 1;
                        transform: translate3d(0, ${labelTransformedPosY}, 0) scale(${labelTransformScaleFactor});
                        transition: transform var(--inputTransitionDuration), visibility 0ms, z-index 0ms;
                    }

                    ::placeholder {
                        color: transparent;
                    }
                    @media only screen and (max-width: ${PREZ.lowerScreenSize}px) {
                        .input-label-word-search {
                            right: 50%;
                            transform: translateX(50%);
                        }
                    }
                `}</style>
                <div className={"trendy-text-input-flex-container"}>
                    <div className={"trendy-text-input-flex-item"}>
                        <div className={"input-text-wrapper"}>
                            <strong>
                                <b>
                                    <input //
                                        type="text"
                                        id={this.trendyTextId}
                                        className={"input-text"}
                                        placeholder={"[NEVER-SEEN]"}
                                        defaultValue={this.state.defaultText}
                                        readOnly={!!this.state.bEditingLocked}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            //
                                            // The word-search callback is embedded within this simple-flagging mechanism
                                            // to delay triggering by  in case user types/deletes quickly
                                            //
                                            if (!!this.props.onTextInputChange) {
                                                const delayTriggeringWordSearchPeriod: number = 500;
                                                this.inputTextLatestValue = e.currentTarget.value;
                                                if (!this.bSearchingWord) this.bSearchingWord = true;
                                                setTimeout(() => {
                                                    this.props.onTextInputChange!(this.inputTextLatestValue);
                                                    this.bSearchingWord = false;
                                                }, !!this.inputTextLatestValue ? delayTriggeringWordSearchPeriod : 0);
                                            }
                                        }}
                                    />
                                    <label //
                                        htmlFor={this.trendyTextId}
                                        className={`input-label ${
                                            !this.props.bIsForWordSearch ? "force-label-transformation" : ""
                                        }
                                        ${!!this.props.bIsForWordSearch ? "input-label-word-search" : ""}

                                        `}
                                    >
                                        {/* NOTE: only this content can be affected by :placeholder css events */}
                                        {this.state.labelContent}
                                    </label>
                                </b>
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
