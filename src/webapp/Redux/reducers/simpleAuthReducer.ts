import { SIMPLEAUTH } from "__MODELS";
import { checkPayload } from "__UTILS/sanityChecks";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

//When in development, use the "demo" feed:
const bDev: boolean = process.env.NODE_ENV !== "production";

/////////////////////////////////////////////////////////////////////////////////
export const simpleAuthReducer: Reducer<SIMPLEAUTH.ImType, AnyAction> = function(
    substate0: SIMPLEAUTH.ImType = SIMPLEAUTH.genIm(),
    action: AnyAction
): SIMPLEAUTH.ImType {
    //////////////////

    //////////////////////
    switch (action.type) {
        //////////////////

        case AppActions.Types.AUTHENTICATE_SIMPLY_FULFILLED:
            //Cast action as corresponding type
            const matchedAction1: ReturnType<typeof AppActions.authenticateSimplyFulfilled> = action as any;
            checkPayload(matchedAction1);
            //Do nothing if the apiKey is falsy
            if (!matchedAction1.payload) return substate0;
            //Save returned apiKey to redux store:
            //TODO: implement local storage solution
            return substate0.set("authorizedApiKey", matchedAction1.payload);

        default:
            return substate0;
    }
};
