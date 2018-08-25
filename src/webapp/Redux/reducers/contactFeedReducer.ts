import { CONTACT, CONTACTFEED } from "__MODELS";
import { checkPayload } from "__UTILS/sanityChecks";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

//When in development, use the "demo" feed:
const bDev: boolean = !!false && process.env.NODE_ENV !== "production";
const localDefault: CONTACTFEED.Interface = !!bDev ? CONTACTFEED.Demo : CONTACTFEED.Default;

/**
 * Reducer governing the array of contacts used to build feed
 * @param substate0
 * @param action
 */
export const contactFeedReducer: Reducer<CONTACTFEED.ImType, AnyAction> = function(
    substate0: CONTACTFEED.ImType = CONTACTFEED.genIm(localDefault),
    action: AnyAction
): CONTACTFEED.ImType {
    //

    //////////////////////
    switch (action.type) {
        //////////////////

        case AppActions.Types.FETCH_MORE_CONTACTS:
            return substate0.set("bFetchFeedInProgress", true);

        case AppActions.Types.FETCH_MORE_CONTACTS_FULFILLED:
            //Cast action as corresponding type
            const matchedAction1: ReturnType<typeof AppActions.fetchMoreContactsFulfilled> = action as any;
            checkPayload(matchedAction1);
            if (!matchedAction1.payload! || matchedAction1.payload!.length === 0) {
                return substate0;
            }
            //Combine contacts fetched from DB; unfortunately, can't at present cast array directly to immutable payload; .genIm() method only accepts POJOs
            const newContacts = CONTACTFEED.genIm({
                contactItems: matchedAction1.payload!
            }).get("contactItems");
            //Add new contacts to existing feed
            const newSubstate1a = substate0.update("contactItems", el => (el as CONTACT.ImTypes).concat(newContacts));
            //Filter duplicates by ID; this unique-element-filtering pattern `.groupBy(el => el.get('_id')).map(el => el.first()).toList()`
            //would be complicated to type generally, so we'll just `any` it for now
            const newSubstate1b: CONTACTFEED.ImType = newSubstate1a.update(
                "contactItems", //
                feed =>
                    (feed as CONTACT.ImTypes)
                        .groupBy(el2 => el2.get("_id"))
                        .map(el3 => el3.first())
                        .toList() as any
            );
            //Finally, increment feedchunks counter
            const newSubstate1c = newSubstate1b.update("feedchunks", el => (el as number) + 1);
            console.log("NEW FEED LENGTH:", newSubstate1c.get("contactItems").size);
            return newSubstate1c;

        case AppActions.Types.SET_CONTACT:
            //Cast action as corresponding type and check payload isnt falsy
            const matchedAction2: ReturnType<typeof AppActions.setContact> = action as any;
            checkPayload(matchedAction2);
            //Build new substate
            const newSubstate2: CONTACTFEED.ImType = substate0.setIn(
                [
                    "contactItems",
                    substate0
                        .get("contactItems")
                        .findIndex(el => el.get("_id") === matchedAction2.payload!.contactToBeSetId)
                ],
                matchedAction2.payload!.newContact
            );
            return newSubstate2;

        case AppActions.Types.DELETE_CONTACT:
            //Cast action as corresponding type
            const matchedAction3: ReturnType<typeof AppActions.deleteContact> = action as any;
            checkPayload(matchedAction3);
            //Build new substate
            const newSubstate3: CONTACTFEED.ImType = substate0.deleteIn([
                "contactItems",
                substate0.get("contactItems").findIndex(el => el.get("_id") === matchedAction3.payload)
            ]);
            return newSubstate3;

        case AppActions.Types.PERSIST_EXPANDED_CONTACT_FULFILLED:
            //Cast action as corresponding type
            const matchedAction4: ReturnType<typeof AppActions.persistExpandedContactFulfilled> = action as any;
            checkPayload(matchedAction4);
            if (!matchedAction4.payload!.length) return substate0;

            //Place persistedContact in feed:
            const persistedPojoContact = matchedAction4.payload![0];
            const persistedImmutableContact = CONTACT.genIm(persistedPojoContact);

            //If _id already exists in feed, then remove that contact (it's easiest way to update feed order)
            const indexOfidToBeMatched: number = substate0
                .get("contactItems")
                .findIndex(el => el.get("_id") === persistedPojoContact._id);
            const newSubstate4 =
                indexOfidToBeMatched === -1 ? substate0 : substate0.deleteIn(["contactItems", indexOfidToBeMatched]);

            //Place persisted contact in feed in appropriate alphabetic position (of lastName):
            const indexOfAlphabeticPosition: number = substate0
                .get("contactItems")
                .findIndex(el => el.get("lastName").toLowerCase() > persistedPojoContact.lastName.toLowerCase());

            // If no position found, place at end of feed:
            if (indexOfAlphabeticPosition === -1)
                return newSubstate4.update("contactItems", (el: CONTACT.ImTypes) => el.push(persistedImmutableContact));
            // Else, insert in appropriate space
            return newSubstate4.update(
                "contactItems",
                el =>
                    ((el as CONTACT.ImTypes).insert(
                        indexOfAlphabeticPosition - 1,
                        persistedImmutableContact
                    ) as any) as CONTACT.ImTypes
            );

        default:
            return substate0;
    }
};
