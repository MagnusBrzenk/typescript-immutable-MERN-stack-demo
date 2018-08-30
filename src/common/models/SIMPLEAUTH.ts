import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { CONTACT } from "./CONTACT";

export namespace SIMPLEAUTH {
    //

    export interface Interface {
        readonly user: string;
        readonly authorizedApiKey: string | undefined;
    }

    export const Default: Interface = {
        user: "guest",
        authorizedApiKey: undefined
    };

    export const Demo: Interface = {
        user: "guest",
        authorizedApiKey: undefined
    };

    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}
