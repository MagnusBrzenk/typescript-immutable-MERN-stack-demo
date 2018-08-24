////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

import * as React from "react";
import { connect } from "react-redux";
import { ROOTSTATE, CONTACT, EXPANDEDCONTACT, NETWORK, PHONENUMBER, SIMPLEAUTH } from "__MODELS";
import { validateEmail } from "__FUNCTIONS/validateEmail";
import { selectExpandedContact, getSimpleAuth } from "__REDUX/selectors";
import { AppActions } from "__REDUX/actions";
import { TrendyTextField } from "__COMPONENTS/TrendyTextField";
import { User } from "__COMPONENTS/@FortawesomeWrappers/User";
import { Phone } from "__COMPONENTS/@FortawesomeWrappers/Phone";
import { Envelope } from "__COMPONENTS/@FortawesomeWrappers/Envelope";
import { LockUnlock } from "__COMPONENTS/@FortawesomeWrappers/LockUnlock";
import { Walking } from "__COMPONENTS/@FortawesomeWrappers/Walking";
import { Globe } from "__COMPONENTS/@FortawesomeWrappers/Globe";
import { Trash } from "__COMPONENTS/@FortawesomeWrappers/Trash";
import { PlusMinus } from "__COMPONENTS/@FortawesomeWrappers/PlusMinus";
import { EditPencil } from "__COMPONENTS/@FortawesomeWrappers/EditPencil";
import PREZ from "__UTILS/frontendPresentation";

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//Props to arrive from parent component (as opposed to redux store)
interface IParentProps {
    width?: string;
    height?: string;
    hideModal: () => void;
}

//Never change IProps for containers; it will always determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

interface IState {
    width: string;
    height: string;
    trendyTextLineHeight: number;
    expandedContact: EXPANDEDCONTACT.ImType;
    bEditingLocked: boolean;
    bProvisionalDeletion: boolean;
    bContactImageLoaded: boolean;
    statusMessageToUser: string | null;
    //Validation Booleans:
    bValidLastName: boolean;
    bValidFirstName: boolean;
    bValidEmail: boolean;
    bValidPhoneNumbers: boolean[];
    //Image dimensions:
    imageZoomScaleFactor: number;
}

/**
 * Container placed within modal in order to view/update contact
 *
 * Note: because it's placed within a modal with hideModal-click-event active, you MUST apply
 * `(e: React.MouseEvent) => e.stopPropagation()` to at least one div herein
 *
 * Note: we're using trendyTextField for the boolean 'active' for the sake of aesthetic continutity;
 * that requires that we handle it a bit differently by disabling editing, and using an onClick-toggle to
 * control the displayed text 'True' or 'False'
 */
class ExpandedContactComponent extends React.Component<IProps, IState> {
    //
    private imageHeightPrcnt: string = "50%";
    private editCircleRadiusPxls: number = 30;
    private iconInnerStyles: React.CSSProperties = { color: PREZ.primaryColorLight };
    private textFiledFontSizePxls: number = 20;
    private contactImageBottomMarginPxls: number = 20;
    private contactImage: HTMLImageElement | undefined;
    private imageZoneId: string = "image-zone-id";
    private uploadFileInput: HTMLInputElement | null = null;
    private showMessageToUserPeriod: number = 3000;

    constructor(props: IProps) {
        super(props);
        this.state = {
            width: this.props.width ? this.props.width : "100%",
            height: this.props.height ? this.props.height : "100%",
            trendyTextLineHeight: 75,
            expandedContact: this.props.expandedContact,
            bEditingLocked: !this.props.expandedContact.get("bOpenInEditMode"),
            bProvisionalDeletion: false,
            bContactImageLoaded: false,
            statusMessageToUser: null,
            //Validation Booleans:
            bValidLastName: true,
            bValidFirstName: true,
            bValidEmail: true,
            // bValidPhoneNumbers: this.props.expandedContact.getIn(["contact", "phoneNumbers"]).map(el => true)
            bValidPhoneNumbers: this.props.expandedContact
                .get("contact")
                .get("phoneNumbers")
                .map(el => !!PHONENUMBER.validate(el.toJS()).length)
                .toJS(),
            //Image dimensions:
            imageZoomScaleFactor: 1
        };
        this.setState = this.setState.bind(this);
        this.handleContactDeletion = this.handleContactDeletion.bind(this);
        this.handleClickOnEditButton = this.handleClickOnEditButton.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.validateContactDataLocally = this.validateContactDataLocally.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
        this.validateContactDataLocally();
        //Calc image hover-scale-factor:
        this.contactImage = new Image();
        this.contactImage.onload = this.handleWindowResize;
        this.contactImage.src = this.state.expandedContact.get("contact").get("imageUrl");
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    componentDidUpdate(prev: IProps) {
        if (prev !== this.props) {
            this.setState({ expandedContact: this.props.expandedContact });
        }
    }

    handleWindowResize() {
        //Calc image-zoom-scale-factor to simulate smooth hover transition between `cover` and `contain` image size:
        const imgNaturalWidth: number = (!!this.contactImage && this.contactImage.naturalWidth) || 1;
        const imgNaturalHeight: number = (!!this.contactImage && this.contactImage.naturalHeight) || 1;
        const imgZoneDiv: HTMLElement | null = document.getElementById(this.imageZoneId);
        const imgZoneWidth: number = (!!imgZoneDiv && imgZoneDiv.offsetWidth) || 1;
        const imgZoneHeight: number = (!!imgZoneDiv && imgZoneDiv.offsetHeight) || 1;
        const bImageIsMoreNaturallyTallThanImageZone =
            imgNaturalHeight / imgNaturalWidth > imgZoneHeight / imgZoneWidth;
        const chromeCorrection: number = 1.009; //Chrome's `scale()` creates an annoying ~1px margin; this fudge factor expands the image just beyond bounds of image zone
        const imageZoomScaleFactor: number =
            chromeCorrection *
            (!!bImageIsMoreNaturallyTallThanImageZone
                ? 1 / ((imgNaturalWidth / imgNaturalHeight) * (imgZoneHeight / imgZoneWidth))
                : 1 * ((imgNaturalWidth / imgNaturalHeight) * (imgZoneHeight / imgZoneWidth)));
        this.setState({ imageZoomScaleFactor, bContactImageLoaded: true });
    }

    handleContactDeletion() {
        this.props.cbStopPersistingExpandedContact();
        this.props.hideModal();
    }

    handleClickOnEditButton() {
        //Always update validity of contact (it never hurts):
        this.validateContactDataLocally();

        //If not editing, always enable editing
        if (!!this.state.bEditingLocked) {
            this.setState({ bEditingLocked: false, bProvisionalDeletion: false });
            return;
        }

        /* OK, so we've been editing; shall we stop? */

        //Determine savability of contact
        const bContactSavable: boolean =
            this.state.bValidFirstName &&
            this.state.bValidLastName &&
            this.state.bValidPhoneNumbers.every(Boolean) &&
            this.state.bValidEmail;

        //If not savable, inform user
        if (!bContactSavable) {
            this.setState({ statusMessageToUser: "Contact Invalid -- Check Highlighted Fields" }, () =>
                setTimeout(() => this.setState({ statusMessageToUser: null }), this.showMessageToUserPeriod)
            );
            return;
        }

        /* OK, we can save it, so let's go ahead and persist this to-be-saved expanded contact */

        this.props.cbSetExpandedContact(this.state.expandedContact.get("contact"));
        this.props.cbPersistExpandedContact();
        this.setState({ bEditingLocked: true });
    }

    handleUploadImage(ev: React.FormEvent) {
        ev.preventDefault(); //Stops form rerouting/refreshing
        if (!!this.uploadFileInput && this.uploadFileInput.files && this.uploadFileInput.files.length > 0) {
            const fileUploadData = new FormData();
            fileUploadData.append("file", this.uploadFileInput.files![0]);
            //Try uploading to AWS via express
            fetch("/api/uploadimages", {
                method: "POST",
                body: fileUploadData,
                headers: { Authorization: this.props.simpleAuth.get("authorizedApiKey") }
            })
                .then(response => {
                    response.json().then((body: NETWORK.IFileUploadResponse) => {
                        //if non-empty urls array received, set imageUrl
                        if (!!body.imageUrls.length)
                            this.setState(
                                oldState => ({
                                    expandedContact: oldState.expandedContact.setIn(
                                        ["contact", "imageUrl"],
                                        body.imageUrls[0]
                                    )
                                }),
                                () => this.componentDidMount()
                            );
                    });
                })
                .catch(err => {
                    console.log("Error occurred trying to upload file!");
                });
        }
    }

    validateContactDataLocally() {
        const bCorrectEmailFormat: boolean = validateEmail(this.state.expandedContact.get("contact").get("email"));
        this.setState(oldState => ({
            bValidFirstName: oldState.expandedContact.get("contact").get("firstName").length > 0,
            bValidLastName: oldState.expandedContact.get("contact").get("lastName").length > 0,
            bValidEmail: !!bCorrectEmailFormat,
            bValidPhoneNumbers: this.state.expandedContact
                .get("contact")
                .get("phoneNumbers")
                .map(el => !!PHONENUMBER.validate(el.toJS()).length)
                .toJS()
        }));
    }

    render() {
        const imageUrl: string | undefined = this.state.expandedContact.get("contact").get("imageUrl");
        const bSmallScreen: boolean = window.outerWidth < PREZ.lowerScreenSize;
        return (
            <div className="expanded-contact">
                <style jsx>{`
                    .expanded-contact {
                        width: ${this.state.width};
                        height: ${this.state.height};
                        background-color: transparent;
                    }
                    .contact-card {
                        margin-top: 0px;
                        width: 100%;
                        height: 100%;
                        max-width: 500px;
                        margin: auto auto;
                        background-color: ${PREZ.primaryColor};
                        opacity: 1;
                    }
                    .contact-image-zone {
                        position: relative;
                        width: 100%;
                        z-index: 1;
                        height: ${this.imageHeightPrcnt};
                        transform: translateX(0);
                    }
                    .contact-images-wrapper {
                        position: relative;
                        height: 100%;
                        width: 100%;
                        overflow: hidden;
                        opacity: 0;
                    }
                    .contact-image-blurred {
                        position: absolute;
                        // margin: 5px 5px;
                        top: 0px;
                        left: 0px;
                        right: 0px;
                        bottom: 0px;
                        background-image: url(${imageUrl});
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        overflow: hidden;
                        filter: blur(10px);
                    }
                    .contact-image-filter {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        right: 0px;
                        bottom: 0px;
                        background-color: rgba(0, 0, 0, 0.8);
                    }
                    .contact-image {
                        position: relative;
                        height: 100%;
                        width: 100%;
                        background-image: url(${imageUrl});
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                        opacity: 1;
                        transition: all 1s;
                        transform: scale(${this.state.imageZoomScaleFactor});
                    }
                    .contact-image:hover {
                        transform: scale(1);
                        transition: all 1s;
                    }
                    .invalid-contact-message {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        top: 0px;
                        left: 0%;
                        width: 100%;
                        height: 10%;
                        opacity: 0;
                        background-color: rgba(255, 255, 255, 1);
                        transition: all 0.2s;
                        font-size: 120%;
                        cursor: default;
                        font-weight: bold;
                        color: red;
                    }
                    .delete-contact-slider,
                    .file-upload-slider {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        top: 0px;
                        bottom: 0px;
                        width: 100%;
                        left: 0%;
                        opacity: 1;
                        background-color: rgba(0, 0, 0, 0.7);
                        transition: all 0.2s;
                        font-size: 120%;
                        cursor: default;
                        color: white;
                    }
                    .file-upload-slider {
                        flex-direction: column;
                    }
                    .delete-contact-slider-controls-wrapper,
                    .file-upload-slider-controls-wrapper {
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 40px;
                    }
                    .delete-contact-slider-controls-item,
                    .file-upload-slider-controls-item {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: rgba(255, 255, 255, 0.5);
                        margin: 5px;
                    }
                    .absolutely-positioned-over-image-edit-button {
                        position: absolute;
                        top: calc(100% - ${this.editCircleRadiusPxls}px);
                        left: 75%;
                        width: ${2 * this.editCircleRadiusPxls}px;
                        height: ${2 * this.editCircleRadiusPxls}px;
                        border-radius: ${this.editCircleRadiusPxls}px;
                        background-color: ${"orange"};
                        box-shadow: 0px 2px 2px black;
                    }
                    .contact-non-image-data {
                        height: calc(100% - ${this.imageHeightPrcnt} - ${this.contactImageBottomMarginPxls}px);
                        overflow: scroll;
                        margin-top: ${this.contactImageBottomMarginPxls}px;
                    }
                    .contact-non-image-data-row {
                        display: flex;
                    }
                    .contact-non-image-data-item-1 {
                        flex: 4;
                    }
                    .contact-non-image-data-item-2 {
                        flex: 6;
                    }
                    .contact-non-image-data-item-3,
                    .contact-non-image-data-item-4 {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .contact-non-image-data-item-3-and-4 {
                        flex: 2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .fade-in {
                        opacity: 1;
                        transition: opacity 1s;
                    }
                `}</style>
                <div className="contact-card" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                    <div className="contact-image-zone" id={this.imageZoneId}>
                        <div className={`contact-images-wrapper ${!!this.state.bContactImageLoaded && "fade-in"}`}>
                            <div className="contact-image-blurred" />
                            <div className="contact-image-filter" />
                            <div className="contact-image" />
                        </div>

                        {!this.state.bEditingLocked &&
                            (!!this.state.bProvisionalDeletion ? (
                                <div className={`delete-contact-slider delete-contact-slider-effect`}>
                                    <div className="delete-contact-slider-controls">
                                        <div>Confirm Contact Deletion</div>
                                        <div className="delete-contact-slider-controls-wrapper">
                                            <span //
                                                onClick={this.handleContactDeletion}
                                                className="delete-contact-slider-controls-item"
                                            >
                                                Delete
                                            </span>
                                            <span //
                                                onClick={() => this.setState({ bProvisionalDeletion: false })}
                                                className="delete-contact-slider-controls-item"
                                            >
                                                Cancel
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={`file-upload-slider`}>
                                    <div className="file-upload-slider-controls">
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                padding: 20
                                            }}
                                        >
                                            Change Image?
                                        </div>
                                        <div className="file-upload-slider-controls-wrapper">
                                            <div className="file-upload-slider-controls-item">
                                                <form
                                                    onSubmit={this.handleUploadImage}
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center",
                                                        padding: 20
                                                    }}
                                                >
                                                    <input
                                                        ref={ref => {
                                                            this.uploadFileInput = ref;
                                                        }}
                                                        type="file"
                                                    />
                                                    <button style={{ maxWidth: 77 }}>Upload</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <div
                            className={`invalid-contact-message
                            ${!!this.state.statusMessageToUser && " fade-in"}`}
                        >
                            {!!this.state.statusMessageToUser && this.state.statusMessageToUser}
                        </div>

                        <div
                            className="absolutely-positioned-over-image-edit-button"
                            onClick={this.handleClickOnEditButton}
                        >
                            {!!this.state.bEditingLocked ? (
                                <EditPencil
                                    size="2x"
                                    color={PREZ.primaryColorDark}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)"
                                    }}
                                />
                            ) : (
                                <LockUnlock
                                    bLocked={false}
                                    // bLocked={!!this.state.bEditingLocked}
                                    size="2x"
                                    color={PREZ.primaryColorDark}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%,-50%)"
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="contact-non-image-data">
                        <div className="contact-non-image-data-row">
                            <div className="contact-non-image-data-item-1">
                                <TrendyTextField //
                                    defaultText={this.state.expandedContact.get("contact").get("firstName")}
                                    height={this.state.trendyTextLineHeight}
                                    bEditingLocked={this.state.bEditingLocked}
                                    inputTextColor={PREZ.displayWhite}
                                    labelContent={this.firstNameJSX}
                                    mainBackgroundColor={PREZ.primaryColor}
                                    fontSizePxls={this.textFiledFontSizePxls}
                                    bottomBorderColor={
                                        !!this.state.bEditingLocked
                                            ? "transparent"
                                            : !!this.state.bValidFirstName
                                                ? PREZ.displayWhite
                                                : PREZ.secondaryColor
                                    }
                                    onTextInputChange={newText =>
                                        this.setState(
                                            oldState => ({
                                                expandedContact: oldState.expandedContact.setIn(
                                                    ["contact", "firstName"],
                                                    newText
                                                )
                                            }),
                                            () => this.validateContactDataLocally()
                                        )
                                    }
                                    bSmallScreen={!!bSmallScreen}
                                />
                            </div>
                            <div className="contact-non-image-data-item-2">
                                <TrendyTextField //
                                    defaultText={this.state.expandedContact.get("contact").get("lastName")}
                                    labelContent={this.lastNameJSX}
                                    height={this.state.trendyTextLineHeight}
                                    bEditingLocked={this.state.bEditingLocked}
                                    inputTextColor={PREZ.displayWhite}
                                    mainBackgroundColor={PREZ.primaryColor}
                                    fontSizePxls={this.textFiledFontSizePxls}
                                    bottomBorderColor={
                                        !!this.state.bEditingLocked
                                            ? "transparent"
                                            : !!this.state.bValidLastName
                                                ? PREZ.displayWhite
                                                : PREZ.secondaryColor
                                    }
                                    onTextInputChange={newText =>
                                        this.setState(
                                            oldState => ({
                                                expandedContact: oldState.expandedContact.setIn(
                                                    ["contact", "lastName"],
                                                    newText
                                                )
                                            }),
                                            () => this.validateContactDataLocally()
                                        )
                                    }
                                />
                            </div>
                            <div //
                                className="contact-non-image-data-item-3-and-4"
                                onClick={() => {
                                    //Toggle provisional deletion if in editing mode
                                    if (!!this.state.bEditingLocked) return;
                                    this.setState(oldState => ({
                                        bProvisionalDeletion: !oldState.bProvisionalDeletion
                                    }));
                                }}
                            >
                                {!this.state.bEditingLocked && (
                                    <Trash
                                        size="2x"
                                        color={
                                            !!this.state.bProvisionalDeletion ? PREZ.secondaryColor : PREZ.displayWhite
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <div className="contact-non-image-data-row">
                            <div
                                className="contact-non-image-data-item-1"
                                onClick={() => {
                                    //Control active-user toggling
                                    if (!!this.state.bEditingLocked) return;
                                    this.setState(oldState => {
                                        return {
                                            expandedContact: oldState.expandedContact.updateIn(
                                                ["contact", "bActive"],
                                                el => !el
                                            )
                                        };
                                    });
                                }}
                            >
                                <TrendyTextField //
                                    defaultText={
                                        this.state.expandedContact.get("contact").get("bActive") ? "True" : "False"
                                    }
                                    height={this.state.trendyTextLineHeight}
                                    bEditingLocked={true}
                                    inputTextColor={PREZ.displayWhite}
                                    labelContent={this.activeJSX}
                                    mainBackgroundColor={PREZ.primaryColor}
                                    fontSizePxls={this.textFiledFontSizePxls}
                                    bottomBorderColor={!!this.state.bEditingLocked ? "transparent" : PREZ.displayWhite}
                                />
                            </div>
                            <div className="contact-non-image-data-item-2" style={{ flex: 8, marginLeft: -10 }}>
                                <TrendyTextField //
                                    // defaultText={this.state.expandedContact.get("contact").get("email")}
                                    defaultText={this.state.expandedContact.getIn(["contact", "email"]) as string}
                                    labelContent={this.emailJSX}
                                    height={this.state.trendyTextLineHeight}
                                    bEditingLocked={this.state.bEditingLocked}
                                    inputTextColor={PREZ.displayWhite}
                                    mainBackgroundColor={PREZ.primaryColor}
                                    fontSizePxls={this.textFiledFontSizePxls}
                                    bottomBorderColor={
                                        !!this.state.bEditingLocked
                                            ? "transparent"
                                            : !!this.state.bValidEmail
                                                ? PREZ.displayWhite
                                                : PREZ.secondaryColor
                                    }
                                    onTextInputChange={newText =>
                                        this.setState(
                                            oldState => ({
                                                expandedContact: oldState.expandedContact.setIn(
                                                    ["contact", "email"],
                                                    newText
                                                )
                                            }),
                                            () => this.validateContactDataLocally()
                                        )
                                    }
                                />
                            </div>
                        </div>
                        {this.state.expandedContact
                            .get("contact")
                            .get("phoneNumbers")
                            .map((el, ind: number) => (
                                <div className="contact-non-image-data-row" key={ind}>
                                    <div className="contact-non-image-data-item-1">
                                        <TrendyTextField //
                                            defaultText={el.get("countryCode").get("code")}
                                            // defaultText={el.getIn(["countryCode", "code"]) as string}
                                            height={this.state.trendyTextLineHeight}
                                            bEditingLocked={this.state.bEditingLocked}
                                            inputTextColor={PREZ.displayWhite}
                                            labelContent={this.countryCodeJSX}
                                            mainBackgroundColor={PREZ.primaryColor}
                                            fontSizePxls={this.textFiledFontSizePxls}
                                            bottomBorderColor={
                                                !!this.state.bEditingLocked
                                                    ? "transparent"
                                                    : !!this.state.bValidPhoneNumbers[ind]
                                                        ? PREZ.displayWhite
                                                        : PREZ.secondaryColor
                                            }
                                            onTextInputChange={newText =>
                                                this.setState(
                                                    oldState => ({
                                                        expandedContact: oldState.expandedContact.setIn(
                                                            ["contact", "phoneNumbers", ind, "countryCode", "code"],
                                                            newText
                                                        )
                                                    }),
                                                    () => this.validateContactDataLocally()
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="contact-non-image-data-item-2">
                                        <TrendyTextField //
                                            defaultText={el.get("dialNumber")}
                                            height={this.state.trendyTextLineHeight}
                                            bEditingLocked={this.state.bEditingLocked}
                                            inputTextColor={PREZ.displayWhite}
                                            labelContent={
                                                el.get("phoneType") === "mobile"
                                                    ? this.mobilePhoneJSX
                                                    : this.homePhoneJSX
                                            }
                                            mainBackgroundColor={PREZ.primaryColor}
                                            fontSizePxls={this.textFiledFontSizePxls}
                                            bottomBorderColor={
                                                !!this.state.bEditingLocked
                                                    ? "transparent"
                                                    : !!this.state.bValidPhoneNumbers[ind]
                                                        ? PREZ.displayWhite
                                                        : PREZ.secondaryColor
                                            }
                                            onTextInputChange={newText =>
                                                this.setState(
                                                    oldState => ({
                                                        expandedContact: oldState.expandedContact.setIn(
                                                            ["contact", "phoneNumbers", ind, "dialNumber"],
                                                            newText
                                                        )
                                                    }),
                                                    () => this.validateContactDataLocally()
                                                )
                                            }
                                        />
                                    </div>
                                    <div
                                        className="contact-non-image-data-item-3"
                                        //Click on phone icon to toggle 'phoneType'
                                        onClick={() =>
                                            this.setState(oldState => ({
                                                expandedContact: oldState.expandedContact.updateIn(
                                                    ["contact", "phoneNumbers", ind, "phoneType"],
                                                    el2 => (el2 === "mobile" ? "home" : "mobile")
                                                )
                                            }))
                                        }
                                    >
                                        <Phone
                                            bMobile={el.get("phoneType") === "mobile"}
                                            size="1x"
                                            color={PREZ.displayWhite}
                                            style={{
                                                transform: "scale(1.2)",
                                                display: !!this.state.bEditingLocked ? "none" : "inline"
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="contact-non-image-data-item-4"
                                        //Click trash icon to remove phone number
                                        onClick={() => {
                                            this.setState(oldState => ({
                                                expandedContact: oldState.expandedContact.deleteIn([
                                                    "contact",
                                                    "phoneNumbers",
                                                    ind
                                                ]),
                                                bValidPhoneNumbers: this.state.bValidPhoneNumbers.filter(
                                                    (el2, ind2) => ind2 !== ind
                                                )
                                            }));
                                        }}
                                    >
                                        <Trash
                                            size="1x"
                                            color={PREZ.displayWhite}
                                            style={{
                                                transform: "scale(1.2)",
                                                display: !!this.state.bEditingLocked ? "none" : "inline"
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        {!this.state.bEditingLocked && (
                            <div className="contact-non-image-data-row" style={{ height: 50 }}>
                                <div className="contact-non-image-data-item-2" />
                                <div className="contact-non-image-data-item-3">
                                    <Phone
                                        bMobile={false}
                                        size="1x"
                                        color={PREZ.displayWhite}
                                        style={{
                                            transform: "scale(1.2)",
                                            display: !!this.state.bEditingLocked ? "none" : "inline"
                                        }}
                                    />
                                </div>
                                <div
                                    className="contact-non-image-data-item-4"
                                    onClick={() => {
                                        this.setState(
                                            oldState => ({
                                                expandedContact: oldState.expandedContact.updateIn(
                                                    ["contact", "phoneNumbers"],
                                                    el => (el as PHONENUMBER.ImTypes).push(PHONENUMBER.genIm())
                                                )
                                            }),
                                            () => this.validateContactDataLocally()
                                        );
                                    }}
                                >
                                    <PlusMinus
                                        bPlus
                                        size="1x"
                                        color={PREZ.displayWhite}
                                        style={{
                                            transform: "scale(1.2)",
                                            display: !!this.state.bEditingLocked ? "none" : "inline"
                                        }}
                                    />
                                </div>
                                <div className="contact-non-image-data-item-2" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    //TrendyText JSX Labels
    private firstNameJSX: JSX.Element = (
        <span style={this.iconInnerStyles}>
            <User style={this.iconInnerStyles} /> {"First Name"}
        </span>
    );
    private lastNameJSX: JSX.Element = (
        <span style={this.iconInnerStyles}>
            <User style={this.iconInnerStyles} /> {"Last Name"}
        </span>
    );
    private emailJSX: JSX.Element = (
        <span style={this.iconInnerStyles}>
            <Envelope style={this.iconInnerStyles} /> {"Email"}
        </span>
    );
    private activeJSX: JSX.Element = (
        <span style={this.iconInnerStyles}>
            <Walking style={this.iconInnerStyles} /> {"User Is Active?"}
        </span>
    );
    private homePhoneJSX: JSX.Element = (
        <span style={this.iconInnerStyles}>
            <Phone bMobile={false} style={this.iconInnerStyles} /> {"Home Phone"}
        </span>
    );
    private mobilePhoneJSX: JSX.Element = (
        <span style={this.iconInnerStyles}>
            <Phone bMobile={true} style={this.iconInnerStyles} /> {"Mobile Phone"}
        </span>
    );
    private countryCodeJSX: JSX.Element = (
        <span style={this.iconInnerStyles}>
            <Globe style={this.iconInnerStyles} /> {"Country Code"}
        </span>
    );
}

//////////////////////////////////////////////////////////////////////////
//// Code below concerns setup of the smart props to/from redux store ////
//////////////////////////////////////////////////////////////////////////

/**
 * Data sent from redux state to component props via selectors
 */
interface IReduxStateToProps {
    expandedContact: EXPANDEDCONTACT.ImType;
    simpleAuth: SIMPLEAUTH.ImType;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        expandedContact: selectExpandedContact(state),
        simpleAuth: getSimpleAuth(state)
    };
}

/**
 * Callbacks to trigger actions to manipulate redux state
 */
interface IReduxCallbacks {
    cbClearExpandedContact: typeof AppActions.clearExpandedContact;
    cbSetExpandedContact: typeof AppActions.setExpandedContact;
    cbPersistExpandedContact: typeof AppActions.persistExpandedContact;
    cbStopPersistingExpandedContact: typeof AppActions.stopPersistingExpandedContact;
}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {
        cbClearExpandedContact: () => dispatch(AppActions.clearExpandedContact()),
        cbSetExpandedContact: (newContactId: CONTACT.ImType) => dispatch(AppActions.setExpandedContact(newContactId)),
        cbPersistExpandedContact: () => dispatch(AppActions.persistExpandedContact()),
        cbStopPersistingExpandedContact: () => dispatch(AppActions.stopPersistingExpandedContact())
    };
};

export const ExpandedContact = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(ExpandedContactComponent);
