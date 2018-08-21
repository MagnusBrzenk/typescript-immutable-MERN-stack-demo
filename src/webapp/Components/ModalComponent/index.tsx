import * as React from "react";
import { CloseWindowIcon } from "__COMPONENTS/@FortawesomeWrappers/CloseWindowIcon";

interface IProps {
    bNoFigureMargins?: boolean;
    captionSpan?: JSX.Element | undefined;
    bSquareScreen?: boolean;
    component: JSX.Element;
    hideModal: () => void;
}

interface IState {
    bImageLoading: boolean;
    bComponentMounted: boolean;
}

/**
 * This is a generic modal that accepts a generic component ('GenCom') as prop and displays it within a designated
 * part of the screen and, optionally, with a caption underneath it. The portion of the screen displaying the
 * GenCom will be larger if no caption is supplied. Parameterizations for the screen, caption, gaps, etc. takes place within the
 * render method. A callback 'hideModal' must be supplied. Typically this modal will set sth like `this.setState({bDisplayModal:false})`
 * in the component in which this ModalComponent is nested (resulting in the ModalComponent not being rendered)
 *
 * The hideModal() callback is triggered here when either (i) the ESC key is pressed, or (ii) a mouse
 * click happens anywhere on the screen, which leads to this important note:
 *
 * IMPORTANT NOTE!!!: because the modal is set up to trigger on a mouse click ANYWHERE, you MUST supply a `event.stopPropogation()`
 * instance on whatever container element within the GenCom best represents the interactive area (or you'll just end up closing the GenCom every time).
 */
export class ModalComponent extends React.Component<IProps, IState> {
    private esc: ((e: KeyboardEvent) => void) | undefined;

    constructor(props: IProps) {
        super(props);
        this.state = { bImageLoading: true, bComponentMounted: false };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ bComponentMounted: true }), 1);
        document.addEventListener(
            "keydown",
            (this.esc = (e: KeyboardEvent) => e.keyCode === 27 && this.props.hideModal())
        );
    }

    componentWillUnmount() {
        if (!!this.esc) document.removeEventListener("keydown", this.esc);
    }

    render() {
        //Parameterize modal screen, caption and gaps/margins
        //Variables: from top to bottom; must add to 100%
        //Vertical
        let topGapPercentage: number = 10;
        let screenHeightPercentage: number = 65;
        let middleGapPercentage: number = 3;
        let captionHeightPercentage: number = 15;
        let bottomGapPercentage: number = 7;

        if (!this.props.captionSpan) {
            //
            topGapPercentage = 10;
            screenHeightPercentage = 84;
            middleGapPercentage = 1;
            captionHeightPercentage = 1;
            bottomGapPercentage = 4;
        }
        if (
            topGapPercentage +
                screenHeightPercentage +
                middleGapPercentage +
                captionHeightPercentage +
                bottomGapPercentage !==
            100
        )
            throw Error("Doesnt add up to 100% !!!");
        //Horizontal
        const componentMargins: number = this.props.bNoFigureMargins ? 0 : 20;

        //Derived paramters
        const screenWidthPixels: number = window.innerWidth - 2 * componentMargins;
        const screenHeightPixels: number = Math.round((window.innerHeight * screenHeightPercentage) / 100);
        const componentWrapperHeight: number = screenHeightPixels;
        let componentWrapperWidth: number = !!this.props.bSquareScreen
            ? componentWrapperHeight
            : window.innerWidth - 2 * componentMargins;
        if (componentWrapperWidth > window.innerWidth) componentWrapperWidth = window.innerWidth;

        return (
            <div
                className="modal-component"
                onClick={e => {
                    this.props.hideModal();
                }}
            >
                <style jsx>{`
                    .modal-component {
                        position: fixed;
                        z-index: 999999999;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: rgba(0, 0, 0, 0.8);
                    }
                    .screen {
                        position: absolute;
                        top: ${topGapPercentage}%;
                        bottom: ${100 - topGapPercentage - screenHeightPercentage}%;
                        left: ${componentMargins}px;
                        right: ${componentMargins}px;
                    }
                    .component-wrapper {
                        position: absolute;
                        top: ${0}%;
                        bottom: ${0}%;
                        left: ${screenWidthPixels / 2 - componentWrapperWidth / 2}px;
                        right: ${screenWidthPixels / 2 - componentWrapperWidth / 2}px;
                        max-width: ${window.innerWidth}px;
                    }

                    .close-window-icon-div {
                        position: absolute;
                        top: -40px;
                        right: 5px;
                    }
                    .caption-div {
                        position: absolute;
                        top: ${100 - bottomGapPercentage - captionHeightPercentage}%;
                        bottom: ${bottomGapPercentage}%;
                        left: ${componentMargins}px;
                        right: ${componentMargins}px;
                    }
                    .caption-span {
                        font-size: 120%;
                        color: rgba(200, 200, 200, 1);
                        text-align: center;
                        line-height: 150%;
                    }
                `}</style>

                {!!this.state.bComponentMounted && (
                    <div className={"screen"}>
                        <div className="close-window-icon-div" onClick={() => this.props.hideModal()}>
                            <CloseWindowIcon size="2x" color="white" />
                        </div>

                        <div
                            className="component-wrapper"
                            style={{ display: this.state.bComponentMounted ? "block" : `none` }}
                        >
                            {this.props.component}
                        </div>
                    </div>
                )}
                <div className="caption-div">
                    <span className="caption-span">{this.props.captionSpan || ""}</span>
                </div>
            </div>
        );
    }
}
