import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { CONTACT } from "./CONTACT";
/**
 *
 */
export namespace EXPANDEDCONTACT {
    //////////////////////////////

    export interface Interface {
        contact: CONTACT.Interface;
        bModalExpanded: boolean;
        bOpenInEditMode: boolean;
    }

    export const Default: Interface = {
        contact: CONTACT.Default,
        bModalExpanded: false,
        bOpenInEditMode: false
    };

    export const Demo: Interface = {
        contact: CONTACT.Demo,
        bModalExpanded: false,
        bOpenInEditMode: false
    };

    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}
