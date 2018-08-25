import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { CONTACT } from "./";

export namespace CONTACTFEED {
    export interface Interface {
        contactItems: CONTACT.Interface[];
        feedchunks: number;
        bFetchFeedInProgress: boolean;
    }

    export const Default: Interface = {
        contactItems: CONTACT.Defaults,
        feedchunks: 0,
        bFetchFeedInProgress: false
    };

    export const Demo: Interface = {
        contactItems: CONTACT.Demos,
        feedchunks: 0,
        bFetchFeedInProgress: false
    };

    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}

// /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////
