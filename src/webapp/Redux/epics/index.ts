import { epicDependencies } from "__REDUX/epics/epicDependencies";
import { AppActions } from "__REDUX/actions";
import { ROOTSTATE, CONTACT } from "__MODELS";
import { from, Observable, of, merge } from "rxjs"; //Get types and/or observable-creation functions
import { mergeMap, map } from "rxjs/operators"; //Get piping operators
import { combineEpics, ofType, Epic } from "redux-observable";
import { Action, AnyAction } from "redux";

const allEpics: TEpic[] = [
    function fetchMoreContactsEpic(
        action$: Observable<AnyAction>,
        rootState: { value: ROOTSTATE.ImType },
        dependencies: typeof epicDependencies
    ) {
        return action$.pipe(
            ofType(AppActions.Types.FETCH_MORE_CONTACTS),
            mergeMap(action =>
                from(
                    dependencies.fetchFeedChunk(
                        rootState.value.get("contactFeed").get("feedchunks"),
                        rootState.value.get("simpleAuth").get("authorizedApiKey")
                    )
                ).pipe(map((response: any) => AppActions.fetchMoreContactsFulfilled(response)))
            )
        );
    },

    function persistExpandedContactEpic(
        action$: Observable<AnyAction>,
        rootState: { value: ROOTSTATE.ImType },
        dependencies: typeof epicDependencies
    ) {
        return action$.pipe(
            ofType(AppActions.Types.PERSIST_EXPANDED_CONTACT),
            mergeMap(action =>
                from(
                    dependencies.persistContacts(
                        [
                            rootState.value
                                .get("expandedContact")
                                .get("contact")
                                .toJS()
                        ],
                        rootState.value.get("simpleAuth").get("authorizedApiKey")
                    )
                ).pipe(
                    map((persistedContacts: CONTACT.Interface[]) =>
                        AppActions.persistExpandedContactFulfilled(persistedContacts)
                    )
                )
            )
        );
    },

    function stopPersistingExpandedContactEpic(
        action$: Observable<Action<any>>,
        rootState: { value: ROOTSTATE.ImType },
        dependencies: typeof epicDependencies
    ) {
        return action$.pipe(
            ofType(AppActions.Types.STOP_PERSISTING_EXPANDED_CONTACT),
            mergeMap(action =>
                from(
                    dependencies.stopPersistingContacts(
                        [
                            rootState.value
                                .get("expandedContact")
                                .get("contact")
                                .get("_id")
                        ],
                        rootState.value.get("simpleAuth").get("authorizedApiKey")
                    )
                ).pipe(
                    //After fetching resource, trigger multiple follow-up actions:
                    mergeMap((deletedContacts: string[]) => [
                        AppActions.showExpandedContact({ bOpen: false }),
                        AppActions.deleteContact(deletedContacts[0])
                    ])
                )
            )
        );
    },

    function simpleAuthEpic(
        action$: Observable<AnyAction>,
        rootState: { value: ROOTSTATE.ImType },
        dependencies: typeof epicDependencies
    ) {
        return action$.pipe(
            ofType(AppActions.Types.AUTHENTICATE_SIMPLY),
            mergeMap((action: ReturnType<typeof AppActions.authenticateSimply>) =>
                from(
                    dependencies.authenticateSimply(
                        action.payload,
                        rootState.value.get("simpleAuth").get("authorizedApiKey")
                    )
                ).pipe(map((responseApiKey: string) => AppActions.authenticateSimplyFulfilled(responseApiKey)))
            )
        );
    }
];

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DO NOT EDIT! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
export const rootEpic = combineEpics.apply(combineEpics, allEpics);
type TEpic = Epic<AnyAction, AnyAction, ROOTSTATE.ImType, typeof epicDependencies>;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
