import { createAction } from "redux-actions";
import { CONTACT, EXPANDEDCONTACT, FRONTENDFILTERS } from "__MODELS";

/////////////////////////////
export namespace AppActions {
    /////////////////////////

    /* ACTION TYPES */

    export enum Types {
        // CONTACTFEED ACTIONS
        FETCH_MORE_CONTACTS = "FETCH_MORE_CONTACTS",
        FETCH_MORE_CONTACTS_FULFILLED = "FETCH_MORE_CONTACTS_FULFILLED",
        SET_CONTACT = "SET_CONTACT",
        DELETE_CONTACT = "DELETE_CONTACT",
        // FRONTENDFILTER ACTIONS
        SET_FILTER = "SET_FILTER",
        WORD_SEARCH = "WORD_SEARCH",
        // EXPANDEDCONTACT ACTIONS
        CLEAR_EXPANDED_CONTACT = "CLEAR_EXPANDED_CONTACT",
        SET_EXPANDED_CONTACT = "SET_EXPANDED_CONTACT",
        SHOW_EXPANDED_CONTACT = "SHOW_EXPANDED_CONTACT",
        PERSIST_EXPANDED_CONTACT = "PERSIST_EXPANDED_CONTACT",
        PERSIST_EXPANDED_CONTACT_FULFILLED = "PERSIST_EXPANDED_CONTACT_FULFILLED",
        STOP_PERSISTING_EXPANDED_CONTACT = "STOP_PERSISTING_EXPANDED_CONTACT",
        // SIMPLEAUTH ACTIONS
        AUTHENTICATE_SIMPLY = "AUTHENTICATE_SIMPLY",
        AUTHENTICATE_SIMPLY_FULFILLED = "AUTHENTICATE_SIMPLY_FULFILLED"
    }

    /* ACTION CREATORS */

    // FRONTENDFILTER ACTIONS
    export const setDisplayedItemsFilter = CreateAction<FRONTENDFILTERS.TFilterStrings>(Types.SET_FILTER);
    export const searchForWord = CreateAction<string>(Types.WORD_SEARCH);
    export const setContact = CreateAction<{ contactToBeSetId: string; newContact: CONTACT.ImType }>(Types.SET_CONTACT);
    export const deleteContact = CreateAction<string>(Types.DELETE_CONTACT);

    // CONTACTFEED ACTIONS
    export const fetchMoreContacts = CreateAction(Types.FETCH_MORE_CONTACTS);
    export const fetchMoreContactsFulfilled = CreateAction<CONTACT.Interface[]>(Types.FETCH_MORE_CONTACTS_FULFILLED);

    // EXPANDEDCONTACT ACTIONS
    export const clearExpandedContact = CreateAction(Types.CLEAR_EXPANDED_CONTACT);
    export const setExpandedContact = CreateAction<CONTACT.ImType>(Types.SET_EXPANDED_CONTACT);
    export const showExpandedContact = CreateAction<{ bOpen: boolean; bEditing?: boolean }>(
        Types.SHOW_EXPANDED_CONTACT
    );
    export const persistExpandedContact = CreateAction(Types.PERSIST_EXPANDED_CONTACT);
    export const persistExpandedContactFulfilled = CreateAction<CONTACT.Interface[]>(
        Types.PERSIST_EXPANDED_CONTACT_FULFILLED
    );
    export const stopPersistingExpandedContact = CreateAction(Types.STOP_PERSISTING_EXPANDED_CONTACT);

    // SIMPLEAUTH ACTIONS
    export const authenticateSimply = CreateAction<string>(Types.AUTHENTICATE_SIMPLY);
    export const authenticateSimplyFulfilled = CreateAction<string>(Types.AUTHENTICATE_SIMPLY_FULFILLED);
}

/*-------------------------------------- DO NOT EDIT --------------------------------------*/
//Wrapper around redux-action's `createAction` to give our action creators stricter types.
function CreateAction<TPayload = never>(type: AppActions.Types): WACT<TPayload> {
    return (createAction(type) as any) as WACT<TPayload>;
}
//WACT = Wrapped-Action-Creator Type
type WACT<TPayload = never> = [TPayload] extends [never] //N.b. 'clothed' types required!
    ? () => { type: AppActions.Types }
    : (payload: TPayload) => { type: AppActions.Types; payload: TPayload };
/*-----------------------------------------------------------------------------------------*/
