import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { PHONENUMBER } from "./PHONENUMBER";
import { validateEmail } from "__FUNCTIONS/validateEmail";
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("CONTACT");

export namespace CONTACT {
    export interface Interface {
        readonly _id?: string;
        readonly firstName: string;
        readonly lastName: string;
        readonly email: string;
        readonly imageUrl?: string;
        readonly bActive: boolean;
        readonly phoneNumbers: PHONENUMBER.Interface[];
        readonly creationDate?: string;
    }

    export const Default: Interface = {
        _id: undefined,
        firstName: "",
        lastName: "",
        email: "",
        imageUrl: "http://sercons.ch/wp-content/uploads/2016/01/no-person.jpg",
        bActive: true,
        phoneNumbers: PHONENUMBER.Defaults,
        creationDate: new Date().toDateString()
    };

    export const Defaults: Interface[] = [];

    export const Demo: Interface = {
        _id: "--DEMO-ID-0--",
        firstName: "Magnus",
        lastName: "Carlsen",
        email: "magnus@carlsen.com",
        imageUrl: "https://pmcvariety.files.wordpress.com/2016/08/still-magnus-no.jpg",
        bActive: true,
        phoneNumbers: PHONENUMBER.Demos,
        creationDate: new Date().toDateString()
    };

    export const Demos: Interface[] = [
        Demo,
        {
            _id: "--DEMO-ID-1--",
            firstName: "Gary",
            lastName: "Kasparov",
            email: "gary@kasparov.com",
            imageUrl:
                "https://www.theepochtimes.com/assets/uploads/2016/06/16/Garry-Kasparov-Benjamin-Chasteen_722220160613-3-700x420.jpg",
            bActive: true,
            phoneNumbers: PHONENUMBER.Demos.reverse(),
            creationDate: new Date().toDateString()
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

            // _id
            if (!(typeof input._id === "string" || typeof input._id === "undefined")) {
                debug("_id is not correct type!!!");
                return null;
            }

            // firstName
            if (!(typeof input.firstName === "string")) {
                debug("firstName is not a string!!!");
                return null;
            }
            if (!(!!input.firstName && input.firstName.length > 0)) {
                console.log("?@?@?@");
                debug("firstName cannot have length 0!!!");
                return null;
            }

            // lastName
            if (!(typeof input.lastName === "string")) {
                debug("lastName is not a string!!!");
                return null;
            }
            if (!(!!input.lastName && input.lastName.length > 0)) {
                debug("lastName cannot have length 0!!!");
                return null;
            }

            // email
            if (!(typeof input.email === "string")) {
                debug("email is not a string!!!");
                return null;
            }
            if (!(!!input.email && input.email.length > 0)) {
                debug("email cannot have length 0!!!");
                return null;
            }
            if (!validateEmail(input.email)) {
                debug("email not formatted properly!!!");
                return null;
            }

            // imageUrl
            if (!(typeof input.imageUrl === "string" || typeof input.imageUrl === "undefined")) {
                debug("imageUrl is not a string or undefined!!!");
                return null;
            }
            if (!!(input.imageUrl === "string" && !!input.imageUrl && input.imageUrl.length === 0)) {
                debug("imageUrl cannot be a string of length 0!!!");
                return null;
            }

            // bActive
            if (!(typeof input.bActive === "boolean")) {
                debug("bActive is not a boolean!!!");
                return null;
            }

            // phoneNumbers
            if (!Array.isArray(input.phoneNumbers)) {
                debug("phoneNumbers is not an array!!!");
                return null;
            }
            if (input.phoneNumbers.length !== PHONENUMBER.validate(input.phoneNumbers).length) {
                debug("Not all phoneNumbers are formatted correctly!!!", JSON.stringify(input));
                return null;
            }

            // creationDate
            if (!(typeof input.creationDate === "string" || typeof input.creationDate === "undefined")) {
                debug("creationDate is not correct type!!!");
                return null;
            }
            if (!!input.creationDate && input.creationDate.length === 0) {
                debug("creationDate cannot have length 0!!!");
                return null;
            }
            if (!!input.creationDate && new Date(input.creationDate).toDateString() === "Invalid Date") {
                debug("creationDate not formatted properly!!!");
                return null;
            }

            //All tests passed
            return input as Interface;
        }
    }

    /*--------------------- DO NOT EDIT/REMOVE ---------------------*/
    export const genIm = getImmutableGenerator<Interface>(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
    /*--------------------------------------------------------------*/
}
