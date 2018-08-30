import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { countryCodes } from "__CONSTANTS";
import { validateCountryCode } from "__FUNCTIONS/validatePhoneNumbers";
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("COUNTRYCODE");

export namespace COUNTRYCODE {
    //

    //Local Aux:
    export type CName = keyof Partial<typeof countryCodes>;
    const defaultCountryName = "United States";
    const demoCountryName1 = "France";
    const demoCountryName2 = "Germany";
    const demoCountryName3 = "Canada";

    export interface Interface {
        readonly code: string;
        readonly name: CName;
    }

    export const Default: Interface = {
        name: defaultCountryName,
        code: countryCodes[defaultCountryName]
    };

    export const Demo: Interface = {
        name: demoCountryName1,
        code: countryCodes[demoCountryName1]
    };

    export const Defaults: Interface[] = [];
    export const Demos: Interface[] = [
        Demo,
        {
            name: demoCountryName1,
            code: countryCodes[demoCountryName2]
        },
        {
            name: demoCountryName1,
            code: countryCodes[demoCountryName3]
        }
    ];

    export function validate(input: any): Interface[] {
        const inputArray = !!Array.isArray(input) ? input : [input];
        return inputArray.map(el => validateOne(el)).filter(Boolean) as Interface[];

        function validateOne(input: any): Interface | null {
            //At minimum, ensure input has no properties that beyond those of Default
            for (const key in input)
                if (!Object.keys(Default).includes(key)) {
                    debug(`Key '${key}' not allowed!!!`);
                    return null;
                }
            //More detailed type tests, etc. go here:

            // name
            if (typeof input.name !== "string") {
                debug("[country] name is not a string!!!");
                return null;
            }
            if (!(!!input.name && input.name.length > 0)) {
                debug("[country] name cannot have length 0!!!");
                return null;
            }

            // code
            if (typeof input.code !== "string") {
                debug("code is not a string!!!");
                return null;
            }
            if (!(!!input.code && input.code.length > 0)) {
                debug("code cannot have length 0!!!");
                return null;
            }
            if (!validateCountryCode(input.code)) {
                debug("phone number not formatted properly!!!");
                return null;
            }

            //All tests passed
            return input as Interface;
        }
    }

    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}
