import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE

/**
 * It seems to be the case that the routerstate simple stores one redux action at a time
 * See: https://github.com/gajus/redux-immutable
 */
export namespace ROUTERSTATE {
    export interface Interface {
        location: any;
        action: any;
    }

    export const Default: Readonly<Interface> = {
        location: null,
        action: null
    };

    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}
