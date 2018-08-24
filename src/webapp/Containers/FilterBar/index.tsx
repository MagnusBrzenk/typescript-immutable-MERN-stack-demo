////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
import * as React from "react";
import { connect } from "react-redux";
import { selectDisplayItemsFilter } from "__REDUX/selectors";
import { ROOTSTATE, FRONTENDFILTERS, CONTACT } from "__MODELS";
import { AppActions } from "__REDUX/actions";
import { TrendyCheckBox } from "__COMPONENTS/TrendyCheckBox";
import { TrendyTextField } from "__COMPONENTS/TrendyTextField";
import { PlusMinus } from "__COMPONENTS/@FortawesomeWrappers/PlusMinus";
import { provisionalNewContactId } from "__CONSTANTS";
import PREZ from "__UTILS/frontendPresentation";

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//Props to arrive from parent component (as opposed to redux store)
interface IParentProps {
    width?: string;
    //Height determined by dynamical self-organizing layout
}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

interface IState {
    width: string;
    trendyLabelFontSizePrcnt: number;
    bShowAllContacts: boolean;
    bShowActiveContacts: boolean;
    bShowInactiveContacts: boolean;
    bLaunchExpandedContact: boolean;
}

class FilterBarComponent extends React.Component<IProps, IState> {
    //

    private getTrendyLabelFontSize = () => PREZ.getDynamicFontSizePrcnt("huge");

    constructor(props: IProps) {
        super(props);
        this.state = {
            width: this.props.width ? this.props.width : "100%",
            trendyLabelFontSizePrcnt: this.getTrendyLabelFontSize(),
            bShowAllContacts: true,
            bShowActiveContacts: false,
            bShowInactiveContacts: false,
            bLaunchExpandedContact: false
        };
        this.setState = this.setState.bind(this);
        this.getTrendyLabelFontSize = this.getTrendyLabelFontSize.bind(this);
        this.handleFilterBarComponentWindowResize = this.handleFilterBarComponentWindowResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleFilterBarComponentWindowResize);
        this.handleFilterBarComponentWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleFilterBarComponentWindowResize);
    }

    handleFilterBarComponentWindowResize() {
        this.setState({ trendyLabelFontSizePrcnt: this.getTrendyLabelFontSize() });
    }

    /**
     * Make sure only 1 of 3 checkBoxes is selected, etc. and update
     * @param clickedCheckBox
     */
    updateCheckBoxes(clickedCheckBox: FRONTENDFILTERS.TFilterStrings) {
        this.setState(
            (oldState: IState) => {
                if (clickedCheckBox === "all" && !oldState.bShowAllContacts) {
                    return {
                        bShowAllContacts: true,
                        bShowActiveContacts: false,
                        bShowInactiveContacts: false
                    };
                }
                if (clickedCheckBox === "active" && !oldState.bShowActiveContacts) {
                    return {
                        bShowAllContacts: false,
                        bShowActiveContacts: true,
                        bShowInactiveContacts: false
                    };
                }
                if (clickedCheckBox === "inactive" && !oldState.bShowInactiveContacts) {
                    return {
                        bShowAllContacts: false,
                        bShowActiveContacts: false,
                        bShowInactiveContacts: true
                    };
                }
                return oldState;
            },
            () => this.props.cbSetDisplayFilter(clickedCheckBox)
        );
    }

    render() {
        return (
            <div
                className="filter-bar"
                style={{
                    width: this.state.width,
                    height: "auto"
                }}
            >
                <style jsx>{`
                    .filter-bar-row {
                        height: auto;
                        background-color: ${PREZ.primaryColorDark};
                        min-height: 100px;
                    }
                    .augment-column {
                        height: auto;
                    }
                    .new-contact-flex-wrapper,
                    .trendy-text-field-flex-wrapper,
                    .trendy-check-box-flex-wrapper {
                        display: flex;
                        height: auto;
                        cursor: default;
                    }

                    .new-contact-wrapper,
                    .trendy-check-boxes-wrapper,
                    .trendy-text-field-wrapper {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100px;
                    }
                    .trendy-text-field-wrapper {
                        margin-bottom: -20px;
                    }
                    .trendy-check-box-and-label-wrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .trendy-label-wrapper {
                        display: inline-block;
                        text-align: center;
                        color: white;
                        font-size: ${this.state.trendyLabelFontSizePrcnt}%;
                        padding: 0px 25px 0px 5px;
                        cursor: pointer;
                    }
                    .trendy-text-field-wrapper {
                        color: white;
                    }

                    @media only screen and (max-width: ${PREZ.lowerScreenSize}px) {
                        .new-contact-wrapper,
                        .trendy-check-box-wrapper {
                            min-height: 0px;
                        }
                        .new-contact-wrapper,
                        .trendy-check-box-wrapper {
                            padding-bottom: 25px;
                        }
                    }
                `}</style>
                <div className="row filter-bar-row">
                    <div className="augment-column column column-3">
                        <div className="trendy-text-field-flex-wrapper" style={{}}>
                            <div className="trendy-text-field-wrapper">
                                <TrendyTextField
                                    fontSizePxls={Math.round((this.state.trendyLabelFontSizePrcnt / 100) * 14)}
                                    bEditingLocked={false}
                                    onTextInputChange={this.props.cbWordSearch}
                                    mainBackgroundColor={PREZ.primaryColorDark}
                                    inputTextBackgroundColor={PREZ.primaryColorDark}
                                    bIsForWordSearch
                                />
                            </div>
                        </div>
                    </div>
                    <div className="augment-column column column-6">
                        <div className="trendy-check-boxes-wrapper">
                            <div
                                onClick={() => this.updateCheckBoxes("all")}
                                className="trendy-check-box-and-label-wrapper"
                            >
                                <TrendyCheckBox
                                    bChecked={this.state.bShowAllContacts}
                                    style={{ paddingLeft: 25, display: "inline-block" }}
                                />
                                <div className="trendy-label-wrapper">{"All"}</div>
                            </div>
                            <div
                                onClick={() => this.updateCheckBoxes("active")}
                                className="trendy-check-box-and-label-wrapper"
                            >
                                <TrendyCheckBox
                                    bChecked={this.state.bShowActiveContacts}
                                    style={{ paddingLeft: 0, display: "inline-block" }}
                                />
                                <div className="trendy-label-wrapper">{"Active"}</div>
                            </div>
                            <div
                                onClick={() => this.updateCheckBoxes("inactive")}
                                className="trendy-check-box-and-label-wrapper"
                            >
                                <TrendyCheckBox
                                    bChecked={this.state.bShowInactiveContacts}
                                    style={{ paddingLeft: 0, display: "inline-block" }}
                                />
                                <div className="trendy-label-wrapper" style={{ paddingRight: 25 }}>
                                    {"Inactive "}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="augment-column column column-3">
                        <div className="new-contact-flex-wrapper" style={{}}>
                            <div
                                className="new-contact-wrapper"
                                onClick={() => {
                                    this.props.cbSetExpandedContact(
                                        CONTACT.genIm().set("_id", provisionalNewContactId)
                                    );
                                    this.props.cbShowExpandedContact({ bOpen: true, bEditing: true });
                                }}
                            >
                                <PlusMinus size="2x" color={"orange"} bPlus />
                                <div
                                    className="trendy-label-wrapper"
                                    style={{
                                        color: "orange"
                                        // color: PREZ.secondaryColor
                                    }}
                                >
                                    <strong> New Contact</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//////////////////////////////////////////////////////////////////////////
//// Code below concerns setup of the smart props to/from redux store ////
//////////////////////////////////////////////////////////////////////////

/**
 * Data sent from redux state to component props via selectors
 */
interface IReduxStateToProps {
    displayItemsFilter: FRONTENDFILTERS.TFilterStrings;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        displayItemsFilter: selectDisplayItemsFilter(state)
    };
}

/**
 * Callbacks to trigger actions to manipulate redux state
 */
interface IReduxCallbacks {
    cbSetDisplayFilter: typeof AppActions.setDisplayedItemsFilter;
    cbWordSearch: typeof AppActions.searchForWord;
    cbSetExpandedContact: typeof AppActions.setExpandedContact;
    cbShowExpandedContact: typeof AppActions.showExpandedContact;
}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {
        cbSetDisplayFilter: (newFilter: FRONTENDFILTERS.TFilterStrings) =>
            dispatch(AppActions.setDisplayedItemsFilter(newFilter)),
        cbWordSearch: (wordForSearching: string) => dispatch(AppActions.searchForWord(wordForSearching)),
        cbSetExpandedContact: (newContact: CONTACT.ImType) => dispatch(AppActions.setExpandedContact(newContact)),
        cbShowExpandedContact: ({ bOpen, bEditing }: { bOpen: boolean; bEditing?: boolean }) =>
            dispatch(AppActions.showExpandedContact({ bOpen, bEditing }))
    };
};

export const FilterBar = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(FilterBarComponent);
