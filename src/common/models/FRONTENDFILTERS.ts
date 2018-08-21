import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE

//////////////////////////////////
export namespace FRONTENDFILTERS {
    //////////////////////////////

    export type TFilterStrings = "all" | "active" | "inactive";

    export interface Interface {
        displayItemsFilter: TFilterStrings;
        wordForSearching: string;
    }

    export const Default: Interface = {
        displayItemsFilter: "all",
        wordForSearching: ""
    };

    export const Demo: Interface = {
        displayItemsFilter: "all",
        wordForSearching: ""
    };

    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}
