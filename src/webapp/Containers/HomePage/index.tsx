import * as React from "react";
import { connect } from "react-redux";
import { getExpandedContact } from "__REDUX/selectors";
import { Contactfeed } from "__CONTAINERS/Contactfeed";
import { FilterBar } from "__CONTAINERS/FilterBar";
import { ExpandedContact } from "__CONTAINERS/ExpandedContact";
import { ModalComponent } from "__COMPONENTS/ModalComponent";
import { EXPANDEDCONTACT, ROOTSTATE } from "__MODELS";
import { AppActions } from "__REDUX/actions";
import PREZ from "__UTILS/frontendPresentation";

interface IParentProps {}

interface IState {
    varyingMargin: number;
    headerHeight: number;
}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

export class HomePageComponent extends React.Component<IProps, IState> {
    private headerElementId: string = "header-wrapper-id";

    constructor(props: IProps) {
        super(props);
        this.state = {
            varyingMargin: 0,
            headerHeight: 0
        };
        this.handleHomePageWindowResize = this.handleHomePageWindowResize.bind(this);
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        //Window resizing
        window.addEventListener("resize", this.handleHomePageWindowResize);
        this.handleHomePageWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleHomePageWindowResize);
    }

    handleHomePageWindowResize() {
        //Dynamically determine headerHeight based on its self-determining inner layout:
        const headerElement: HTMLElement | null = document.getElementById(this.headerElementId);
        const headerHeight: number = !!headerElement ? headerElement.offsetHeight : 0;
        //Dynamically determine size of side margins based on window size
        const varyingMargin: number = PREZ.getFeedMarginSize();
        //Update state
        this.setState({ varyingMargin, headerHeight });
    }

    render() {
        return (
            <div className="home-page">
                <style jsx>{`
                    .home-page {
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    .header-wrapper {
                        width: 100%;
                        height: auto;
                        position: fixed;
                        top: 0px;
                        z-index: 1;
                        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.5);
                    }
                    .contact-feed-wrapper {
                        margin: auto auto;
                        margin-top: ${this.state.headerHeight}px;
                        height: ${window.innerHeight - this.state.headerHeight}px;
                        width: calc(100% - ${this.state.varyingMargin / 2}px);
                        max-width: 1200px;
                    }
                `}</style>
                <header className="header-wrapper" id={this.headerElementId}>
                    <FilterBar />
                </header>
                <div className="contact-feed-wrapper">
                    <Contactfeed heightPxls={window.innerHeight - this.state.headerHeight} width={"100%"} />
                </div>
                {!!this.props.expandedContact.get("bModalExpanded") && (
                    <ModalComponent
                        bNoFigureMargins
                        hideModal={() => this.props.cbShowExpandedContact({ bOpen: false })}
                        component={
                            <ExpandedContact //
                                height={"100%"}
                                hideModal={() => this.props.cbShowExpandedContact({ bOpen: false })}
                            />
                        }
                    />
                )}
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
    expandedContact: EXPANDEDCONTACT.ImType;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        expandedContact: getExpandedContact(state)
    };
}

/**
 * Callbacks to trigger actions to manipulate redux state
 */
interface IReduxCallbacks {
    cbShowExpandedContact: typeof AppActions.showExpandedContact;
}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {
        cbShowExpandedContact: ({ bOpen, bEditing }: { bOpen: boolean; bEditing?: boolean }) =>
            dispatch(AppActions.showExpandedContact({ bOpen, bEditing }))
    };
};

export const HomePage = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(HomePageComponent);
