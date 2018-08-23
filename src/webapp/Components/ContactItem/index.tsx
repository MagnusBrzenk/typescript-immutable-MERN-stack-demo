import * as React from "react";
import { CONTACT } from "__MODELS";
import { User } from "__COMPONENTS/@FortawesomeWrappers/User";
import { Phone } from "__COMPONENTS/@FortawesomeWrappers/Phone";
import { Envelope } from "__COMPONENTS/@FortawesomeWrappers/Envelope";
import { AngleArrow } from "../@FortawesomeWrappers/AngleArrow";
import localCssStyles from "./styles.css";
import PREZ from "__UTILS/frontendPresentation";

interface IProps {
    contactData: CONTACT.ImType;
    cbSetExpandedContact: (newContact: CONTACT.ImType) => void;
    cbShowExpandedContact: ({ bOpen, bEditingLocked }: { bOpen: boolean; bEditingLocked?: boolean }) => void;
}

interface IState {
    bActiveBoxChecked: boolean;
    selectedPhoneNumberIndex: number;
    fontSizePercent: string;
    contactData: CONTACT.ImType;
}

export class ContactItem extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            bActiveBoxChecked: true,
            selectedPhoneNumberIndex: 0,
            fontSizePercent: "110%",
            contactData: this.props.contactData
        };
        this.adjustPhoneNumberIndex = this.adjustPhoneNumberIndex.bind(this);
        this.setState = this.setState.bind(this);
    }

    //Add +/- 1 to selectedIndex without going outside array bounds
    adjustPhoneNumberIndex(e: React.MouseEvent, adjustIndex: -1 | 1) {
        e.stopPropagation(); //lets you click on phone icon without opening dialog
        this.setState(oldState => {
            const totalPhoneNumbers: number = this.props.contactData.get("phoneNumbers").size;
            let newIndex = (oldState.selectedPhoneNumberIndex + adjustIndex) % totalPhoneNumbers;
            if (newIndex < 0) newIndex = 0;
            return { selectedPhoneNumberIndex: newIndex };
        });
    }

    render() {
        //Layout params:
        const editIconWrapperWidth: number = 0; // 50;
        //Convenience vars:
        const contact: CONTACT.ImType = this.props.contactData;
        const bActive: boolean = !!contact.get("bActive");
        const phoneNums = contact.get("phoneNumbers");
        const phoneIndex: number = this.state.selectedPhoneNumberIndex;
        //Format phone-number:
        const countryCode = phoneNums.getIn([phoneIndex, "countryCode", "code"]);
        let selectedPhoneNumber: string = "";
        if (phoneNums.size > 0) {
            const dialNumber = phoneNums.get(phoneIndex).get("dialNumber");
            selectedPhoneNumber = `(${countryCode}) ${dialNumber}`;
        }
        //Screen-size-layout logic:
        const bSmallLayout: boolean = window.innerWidth < PREZ.lowerScreenSize;

        return (
            <div className="contact-item">
                <style jsx>{`
                    @keyframes lightenIn {
                        0% {
                            opacity: 0.5;
                        }
                        100% {
                            opacity: 1;
                        }
                    }
                    .contact-item {
                        cursor: pointer;
                        animation: lightenIn 0.5s ease-in-out;
                        width: 100%;
                        margin: auto auto;
                        padding: 5px;
                        display: block;
                        position: relative;
                        height: auto;
                        box-sizing: border-box;
                        border: solid 0px red;
                        font-size: ${this.state.fontSizePercent};
                        background-color: ${PREZ.primaryColor};
                        color: ${!!bActive ? "white" : PREZ.primaryColorLight};
                        border-bottom: solid 1px white;
                    }
                    .full-name-column,
                    .email-column,
                    .phonenumber-column {
                        padding: 10px;
                        box-sizing: border-box;
                        border: solid 0px blue;
                        overflow: scroll;
                        white-space: nowrap;
                    }
                    .contact-info-column {
                        width: calc(100% - ${editIconWrapperWidth}px);
                    }
                    .edit-icon-wrapper {
                        float: right;
                        display: inline;
                        width: ${editIconWrapperWidth}px;
                        position: absolute;
                        top: 0px;
                        bottom: 0px;
                        right: 0px;
                    }
                `}</style>
                <div
                    className="contact-info-column"
                    onClick={() => {
                        //Set contact in this row as expanded contact and open dialog
                        this.props.cbSetExpandedContact(this.state.contactData);
                        this.props.cbShowExpandedContact({ bOpen: true });
                    }}
                >
                    <div className={`${localCssStyles.row}`}>
                        <div className={`full-name-column ${localCssStyles.column} ${localCssStyles.column5}`}>
                            <User style={{ marginRight: 10 }} />
                            {`${contact.get("firstName")} ${contact.get("lastName")}`}
                        </div>
                        <div className={`email-column ${localCssStyles.column} ${localCssStyles.column6}`}>
                            <Envelope style={{ marginRight: 10 }} />
                            {contact.get("email")}
                        </div>
                        <div className={`phonenumber-column ${localCssStyles.column} ${localCssStyles.column5}`}>
                            <div style={{ display: "inline-block" }} onClick={e => this.adjustPhoneNumberIndex(e, 1)}>
                                <span>
                                    <div style={{ display: "inline-block", width: 20 }}>
                                        <Phone bMobile={!!(phoneNums.getIn([phoneIndex, "phoneType"]) === "mobile")} />
                                    </div>
                                    <span
                                        style={{
                                            visibility: phoneNums.size === 1 || !!bSmallLayout ? "hidden" : "visible",
                                            marginRight: !!bSmallLayout ? 0 : 10
                                        }}
                                    >
                                        <AngleArrow direction="right" style={{ paddingLeft: 5 }} />
                                    </span>
                                </span>
                            </div>
                            <span>{selectedPhoneNumber}</span>
                        </div>
                    </div>
                </div>
                {/* <div className="edit-icon-wrapper aux-vertical-center">
                    <div className="vertical-and-horizontal-center">
                        <EditPencil color="white" />
                    </div>
                </div> */}
            </div>
        );
    }
}
