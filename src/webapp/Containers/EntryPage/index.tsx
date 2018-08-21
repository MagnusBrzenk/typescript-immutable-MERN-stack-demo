import * as React from "react";
import { connect } from "react-redux";
import { getSimpleAuth } from "__REDUX/selectors";
import { SIMPLEAUTH, ROOTSTATE } from "__MODELS";
import { AppActions } from "__REDUX/actions";
import { HomePage } from "__CONTAINERS/HomePage";
import PREZ from "__UTILS/frontendPresentation";

interface IParentProps {}

interface IState {
    formMessage: string;
}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

export class EntryPageComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            formMessage: ""
        };
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const form: HTMLFormElement = event.target as any;
        const data: FormData = new FormData(form);
        const passwordSubmitted: string = data.get("password") as any;
        this.props.cbAuthenticateSimply(passwordSubmitted);

        const apiKey = this.props.simpleAuth.get("authorizedApiKey");
        if (!apiKey) this.setState({ formMessage: "Password Unsuccesful" });
    }

    render() {
        const { simpleAuth } = this.props;
        const authorizedApiKey: string = simpleAuth.get("authorizedApiKey");
        return (
            <div className="entry-page">
                <style jsx>{`
                    .entry-page {
                        width: 100%;
                        height: 100%;
                    }
                    .entry-page-content {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                    .terms-of-use {
                        border: solid 1px red;
                        padding: 30px;
                        margin: 20px 0px;
                    }
                    .entry-page-form {
                        width: 200px;
                        padding: 20px;
                        display: flex;
                        box-sizing: border-box;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background-color: ${PREZ.primaryColor};
                        margin-top: 0px;
                        margin-bottom: 50px;
                    }

                    .password-input {
                        flex: 1;
                        box-sizing: border-box;
                        padding: 10px;
                        width: 100%;
                        min-height: 30px;
                        margin: 10px;
                        text-align: center;
                    }
                    .password-input::placeholder {
                        color: grey;
                        text-align: center;
                    }
                    .password-button {
                        flex: 1;
                        width: 100%;
                        box-sizing: border-box;
                        padding: 10px;
                        min-height: 30px;
                        border: none;
                        margin: 10px;
                        margin-top: 0px;
                        color: ${PREZ.displayWhite};
                        background-color: ${PREZ.primaryColorDark};
                    }
                    .about-section {
                        text-align: left;
                        width: 75%;
                        max-width: 750px;
                    }
                    h1,
                    h2,
                    h3,
                    h4 {
                        text-align: center;
                    }
                    .form-message {
                        color: red;
                        height: 40px;
                        display: flex;
                        align-items: center;
                    }
                `}</style>

                {!authorizedApiKey ? (
                    <div className="entry-page-content">
                        <div className="about-section">
                            <h1>MERN-STACK DEMO</h1>
                            <p>This is a demo for Dan Darg's Typescript-immutable-MERN-stack architecture. </p>

                            <p>
                                The password would have been sent along with the link to this site. If you did not
                                receive one, then contact darg@jhu.edu
                            </p>

                            <p>The code for this site can be found here: ___________</p>
                            <p>
                                The site's specs are super-up-to-date as of August 2018. For details, see the various
                                readme's within the repo. Some key features include:
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <ul style={{ textAlign: "left" }}>
                                    <li>Typescript 3.0.1</li>
                                    <li>React 16.4.2</li>
                                    <li>Redux 4.0.0</li>
                                    <li>Webpack 4.17.0</li>
                                    <li>Rxjs 6.2.2</li>
                                    <li>Immutable 4.0.0-rc.9</li>
                                    <li>Styled-JSX 3.0.2</li>
                                </ul>
                            </div>
                            <p>
                                CSS, Less and Sass/Scss are enabled globally, through local css-modules, and via my
                                overall preferred approach using styled-jsx (CSS only).
                            </p>
                            <p>
                                Note: there are lots of ways this site could be improved, but since it's main purpose
                                was to develop/demonstrate boilerplate-design patterns in the world of
                                typescript-react-redux-immutable, I've decided not to obsess over it (any more than is
                                seen here).
                            </p>
                            <div className="terms-of-use">
                                <h3>TERMS OF USE</h3>
                                <h4>As of August 21st 2018</h4>
                                <p>
                                    Feel free to edit/add/delete contacts to the site but be aware that the DB will be
                                    reset automatically <b>at least</b> every 24 hours!
                                </p>
                                <p>
                                    As a demo site, it's not designed/intended for high security or heavy traffic, so
                                    please be sensible about how it's shared, etc.
                                </p>
                                <p>
                                    LAW-
                                    {"&"}
                                    -ORDER DISCLAIMER. The textual data on this site is entirely fictional and has been
                                    randomly associated with images that were themselves randomly scraped from public
                                    facebook data.
                                </p>

                                <p>
                                    SUUM CUIQUE DISCLAIMER. The usual data-centric-websites disclaimers apply: any usage
                                    of this site, data you submit, etc. is done so at your own risk and all parties
                                    involved may keep their eternal souls.
                                </p>
                                <p>
                                    WARNING! Attempts to take down this site with e.g. globally coordinated DOS attacks
                                    shall be met with <b> severe passive aggression</b> (
                                    <a href="https://www.smbc-comics.com/comic/2009-10-24">it's not worth it!</a>
                                    ).
                                </p>
                            </div>
                        </div>
                        <div style={{ borderBottom: "0px solid black", width: "100%" }} />
                        <div className="form-message">{this.state.formMessage}</div>
                        <form onSubmit={e => this.handleSubmit(e)} noValidate className={"entry-page-form"}>
                            <input //
                                className="password-input"
                                id="password-id"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                            />

                            <button //
                                className="password-button"
                            >
                                SUBMIT
                            </button>
                        </form>
                    </div>
                ) : (
                    <HomePage />
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
    simpleAuth: SIMPLEAUTH.ImType;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        simpleAuth: getSimpleAuth(state)
    };
}

/**
 * Callbacks to trigger actions to manipulate redux state
 */
interface IReduxCallbacks {
    cbAuthenticateSimply: typeof AppActions.authenticateSimply;
}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {
        cbAuthenticateSimply: (password: string) => dispatch(AppActions.authenticateSimply(password))
    };
};

export const EntryPage = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(EntryPageComponent);
