import * as React from "react";
import { Check } from "__COMPONENTS/@FortawesomeWrappers/Check";
import genUniqueId from "__UTILS/genUniqueId";
import sassStyles from "./style.sass";

interface IProps {
    bChecked: boolean;
    style?: React.CSSProperties;
}

interface IState {
    //
}

/**
 * Wrapper around trendy SASS checkbox adapted from this codepen: https://codepen.io/landb/pen/pRQPNX
 * Note: We disable checkbox CSS so that its 'checkedness' can be controlled entirely by parent via JS
 */
export class TrendyCheckBox extends React.Component<IProps, IState> {
    private checkId: string = "checkId-" + genUniqueId(); //Define unique id so we can uniquely pick out this instance of the TrendyCheckBox

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.updateCheckBox();
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.bChecked !== prevProps.bChecked) {
            this.updateCheckBox();
        }
    }

    updateCheckBox() {
        const inputElement = document.getElementById(this.checkId);
        if (!!inputElement) (inputElement as HTMLInputElement).disabled = true;
        if (!!inputElement) (inputElement as HTMLInputElement).checked = this.props.bChecked;
    }

    render() {
        return (
            <div className={"trendy-check-box"} style={this.props.style}>
                <div className={sassStyles.localBody}>
                    <div className={sassStyles.container}>
                        <div className={sassStyles.checkboxes}>
                            <div className={sassStyles.check}>
                                <input id={this.checkId} type="checkbox" />
                                <label htmlFor={this.checkId}>
                                    <div className={sassStyles.box}>
                                        <i>
                                            <Check />
                                        </i>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
