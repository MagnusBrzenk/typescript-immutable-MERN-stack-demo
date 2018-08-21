import { EXPANDEDCONTACT } from "__MODELS";
import { checkPayload } from "__UTILS/sanityChecks";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

//When in development, use the "demo" feed:
const bDev: boolean = process.env.NODE_ENV !== "production";
const localDefault: EXPANDEDCONTACT.Interface = !!bDev ? EXPANDEDCONTACT.Demo : EXPANDEDCONTACT.Default;

///////////////////////////////////////////////////////////////////////////////////
export const expandedContactReducer: Reducer<EXPANDEDCONTACT.ImType, AnyAction> = function(
    substate0: EXPANDEDCONTACT.ImType = EXPANDEDCONTACT.genIm(localDefault),
    action: AnyAction
): EXPANDEDCONTACT.ImType {
    ///////////////

    //Printout Action in non-production
    // if (!!bDev)
    //     console.log(
    //         "+++++++++++++++++++++",
    //         "ContactFeed Action>>>",
    //         action.type,
    //         action.payload,
    //         "+++++++++++++++++++++"
    //     );

    //////////////////////
    switch (action.type) {
        //////////////////

        case AppActions.Types.SET_EXPANDED_CONTACT:
            //Cast action as corresponding type
            const matchedAction1: ReturnType<typeof AppActions.setExpandedContact> = action as any;
            checkPayload(matchedAction1);
            //Build new substate;
            const newExpandedContact1: EXPANDEDCONTACT.ImType = substate0.set("contact", matchedAction1.payload!);
            return newExpandedContact1;

        case AppActions.Types.SHOW_EXPANDED_CONTACT:
            //Cast action as corresponding type
            const matchedAction2: ReturnType<typeof AppActions.showExpandedContact> = action as any;
            checkPayload(matchedAction2);
            //Build new substate;
            const substate2a: EXPANDEDCONTACT.ImType = substate0.set("bModalExpanded", matchedAction2.payload!.bOpen!);
            const substate2b: EXPANDEDCONTACT.ImType = substate2a.set(
                "bOpenInEditMode",
                matchedAction2.payload!.bEditing!
            );
            return substate2b;

        case AppActions.Types.CLEAR_EXPANDED_CONTACT:
            return EXPANDEDCONTACT.genIm(localDefault);

        // If expanded contact is succesfully persisted, then set its _id
        case AppActions.Types.PERSIST_EXPANDED_CONTACT_FULFILLED:
            const matchedAction3: ReturnType<typeof AppActions.persistExpandedContactFulfilled> = action as any;
            checkPayload(matchedAction3);
            if (!matchedAction3.payload!.length) return substate0;
            return substate0.setIn(["contact", "_id"], matchedAction3.payload![0]._id as string);

        default:
            return substate0;
    }
};
