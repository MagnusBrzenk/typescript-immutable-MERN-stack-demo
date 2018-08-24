///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////    TO USE THIS TEMPLATE: COPY, PASTE & EDIT CONTENT BETWEEN LINES WITH PATTERN /* ~~~ */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
/* import namespaces from "__MODELS" and use their Interface/Demo/Default to build out the structure of this namespace */
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("RENAME_ME");

export namespace RENAME_ME {
    /* POJO structures to be customized */

    /* Required: Define type properties of this POJO */
    export interface Interface {
        id: string | undefined;
    }

    /* Required: default values to initialize instances of this data structure */
    export const Default: Readonly<Interface> = {
        id: undefined
    };

    /* Optional: array of default objects to initialize the Defaults of parent models */
    export const Defaults: Readonly<Interface[]> = [Default];

    /* Optional: demo object to use for development, etc. */
    export const Demo: Readonly<Interface> = {
        id: "ABCD0123456"
    };

    /* Optional: function to validate whether a given object has the properties/formatting of Interface or Interface[] */
    export function validate(input: any): Interface[] {
        //Make sure we're dealing with an array of candidate inputs:
        const inputArray = !!Array.isArray(input) ? input : [input];
        //Return array with non-Interface types filtered-out:
        return inputArray.map(el => validateOne(el)).filter(Boolean) as Interface[];
        function validateOne(input: any): Interface | null {
            //At minimum, ensure input has no properties that beyond those of Default
            for (const key in input)
                if (!Object.keys(Default).includes(key)) {
                    debug(`Key '${key}' not allowed!!!`);
                    return null;
                }
            //More detailed type tests, etc. go here:

            /* ONLY EDIT HERE */

            //All tests passed
            return input as Interface;
        }
    }

    /* Immutable Generator and Types: DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default); //Get function to construct deeply-nested-immutable 'object' seeded by this namespace's Default POJO
    export type ImType = getImType<Interface>; //Get the typescript type to apply to instances of this namespace's deeply-nested-immutable 'object'
    export type ImTypes = getImType<Interface[]>; //Use this 'array version' of the Immutable type when e.g. getIn-ing a nested immutable List
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
