import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { COUNTRYCODE } from "./COUNTRYCODE";
import { validateMainNumber } from "__FUNCTIONS/validatePhoneNumbers";
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("PHONENUMBER");

export namespace PHONENUMBER {
    //

    export type TPhoneType = "mobile" | "home";

    export interface Interface {
        readonly countryCode: COUNTRYCODE.Interface;
        readonly dialNumber: string;
        readonly phoneType: TPhoneType;
    }

    export const Default: Interface = {
        countryCode: COUNTRYCODE.Default,
        dialNumber: "",
        phoneType: "home"
    };

    export const Defaults: Interface[] = [];

    export const Demo: Interface = {
        countryCode: COUNTRYCODE.Demo,
        dialNumber: "000 111 2222",
        phoneType: "mobile"
    };

    export const Demos: Interface[] = [
        Demo,
        {
            countryCode: COUNTRYCODE.Demos[1],
            dialNumber: "000 111 2222",
            phoneType: "home"
        },
        {
            countryCode: COUNTRYCODE.Demos[2],
            dialNumber: "000 333 4444",
            phoneType: "mobile"
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

            // countryCode
            if (!COUNTRYCODE.validate(input.countryCode).length) {
                debug(`countryCode not formatted properly`);
                return null;
            }

            // dialNumber
            if (typeof input.dialNumber !== "string") {
                debug("dialNumber is not a string!!!");
                return null;
            }
            if (!(!!input.dialNumber && input.dialNumber.length > 0)) {
                debug("dialNumber cannot have length 0!!!");
                return null;
            }
            if (!validateMainNumber(input.dialNumber)) {
                debug("phone number not formatted properly!!!");
                return null;
            }

            // phoneType
            if (typeof input.phoneType !== "string") {
                debug("phoneType is not a string!!!");
                return null;
            }
            if (!(!!input.phoneType && input.phoneType.length > 0)) {
                debug("phoneType cannot have length 0!!!");
                return null;
            }

            //All tests passed
            return input as Interface;
        }
    }

    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator<Interface>(Default);
    export const genIms = getImmutableGenerator<Interface[]>(Defaults);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}
