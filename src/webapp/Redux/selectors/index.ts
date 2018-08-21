import { createSelector } from "reselect";
import { ROOTSTATE, CONTACT, EXPANDEDCONTACT, FRONTENDFILTERS, SIMPLEAUTH } from "__MODELS";

/////////////////////////////////////////////////////////
// ELEMENTAL SELECTORS
/////////////////////////////////////////////////////////

const getAllContactItems = (state: ROOTSTATE.ImType): CONTACT.ImTypes => {
    const contactItems: CONTACT.ImTypes = state.get("contactFeed").get("contactItems"); //.get("contactItems");
    return contactItems;
};

const getDisplayItemsFilter = (state: ROOTSTATE.ImType): FRONTENDFILTERS.TFilterStrings => {
    const frontendfilters: FRONTENDFILTERS.ImType = state.get("frontendFilters");
    const displayItemsFilter: FRONTENDFILTERS.TFilterStrings = frontendfilters.get("displayItemsFilter");
    return displayItemsFilter;
};

const getWordForSearching = (state: ROOTSTATE.ImType): string => {
    const frontendfilters: FRONTENDFILTERS.ImType = state.get("frontendFilters");
    const wordForSearching: string = frontendfilters.get("wordForSearching");
    return wordForSearching;
};

export const getExpandedContact = (state: ROOTSTATE.ImType): EXPANDEDCONTACT.ImType => {
    const expandedContact: EXPANDEDCONTACT.ImType = state.getIn(["expandedContact"]);
    return expandedContact;
};

export const getSimpleAuth = (state: ROOTSTATE.ImType): SIMPLEAUTH.ImType => {
    const simpleAuth: SIMPLEAUTH.ImType = state.getIn(["simpleAuth"]);
    return simpleAuth;
};

/////////////////////////////////////////////////////////
// MEMOIZED SELECTORS
/////////////////////////////////////////////////////////

export const selectAllContactItems = createSelector(
    getAllContactItems,
    getWordForSearching,
    (contactItems: CONTACT.ImTypes, wordForSearching: string): CONTACT.ImTypes => {
        /* If no wordForSearching then return entire feed; else return feed filtered on word */
        if (!wordForSearching) return contactItems;
        return contactItems.filter(
            (el: CONTACT.ImType) =>
                !!`${el.get("firstName")} ${el.get("lastName")} ${el.get("email")}`
                    .toLowerCase()
                    .includes(wordForSearching.toLowerCase())
        );
    }
);

export const selectActiveContactItems = createSelector(
    getAllContactItems,
    getWordForSearching,
    (contactItems: CONTACT.ImTypes, wordForSearching: string): CONTACT.ImTypes => {
        if (!wordForSearching) return contactItems.filter((el: CONTACT.ImType) => !!el.get("bActive"));
        return contactItems.filter(
            (el: CONTACT.ImType) =>
                !!el.get("bActive") &&
                !!`${el.get("firstName")} ${el.get("lastName")} ${el.get("email")}`
                    .toLowerCase()
                    .includes(wordForSearching.toLowerCase())
        );
    }
);

export const selectInactiveContactItems = createSelector(
    getAllContactItems,
    getWordForSearching,
    (contactItems: CONTACT.ImTypes, wordForSearching: string): CONTACT.ImTypes => {
        if (!wordForSearching) return contactItems.filter((el: CONTACT.ImType) => !el.get("bActive"));
        return contactItems.filter(
            (el: CONTACT.ImType) =>
                !el.get("bActive") &&
                !!`${el.get("firstName")} ${el.get("lastName")} ${el.get("email")}`
                    .toLowerCase()
                    .includes(wordForSearching.toLowerCase())
        );
    }
);

export const selectDisplayItemsFilter = createSelector(
    getDisplayItemsFilter,
    (selectDisplayItemsFilter: FRONTENDFILTERS.TFilterStrings): FRONTENDFILTERS.TFilterStrings => {
        return selectDisplayItemsFilter;
    }
);

export const selectWordForSearching = createSelector(
    getWordForSearching,
    (wordForSearching: string): string => {
        return wordForSearching;
    }
);

export const selectExpandedContact = createSelector(
    getExpandedContact,
    (expandedCOntact: EXPANDEDCONTACT.ImType): EXPANDEDCONTACT.ImType => {
        return expandedCOntact;
    }
);
