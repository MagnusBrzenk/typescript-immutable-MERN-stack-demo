import { FRONTENDFILTERS } from "__MODELS";
import { checkPayload } from "__UTILS/sanityChecks";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

///////////////////////////////////////////////////////////////////////////////////////////
export const frontendFiltersReducer: Reducer<FRONTENDFILTERS.ImType, AnyAction> = function(
    substate0: FRONTENDFILTERS.ImType = FRONTENDFILTERS.genIm(),
    action: AnyAction
): FRONTENDFILTERS.ImType {
    ///////////////////////

    //////////////////////
    switch (action.type) {
        //////////////////

        case AppActions.Types.SET_FILTER:
            //Cast action as corresponding type
            const matchedAction1: ReturnType<typeof AppActions.setDisplayedItemsFilter> = action as any;
            checkPayload(matchedAction1);
            //Build new substate;
            return substate0.set("displayItemsFilter", matchedAction1.payload!);

        case AppActions.Types.WORD_SEARCH:
            //Cast action as corresponding type
            const matchedAction2: ReturnType<typeof AppActions.searchForWord> = action as any;
            checkPayload(matchedAction2);
            //Build new substate;
            return substate0.set("wordForSearching", matchedAction2.payload!);

        default:
            return substate0;
    }
};
