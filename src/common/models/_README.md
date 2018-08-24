# NOTES ON MODELS

The models and "metatyping" within this dir are the most distinctive part of this MERN architecture and you MUST understand at least a few basic things of what goes on here.

## Motivation

-   data-rich webapps can get complicated quickly, so we want to make our data structures as orderly as possible.
-   in general you want to organize your data in the frontend -- at least conceptually -- as a giant plain-old-javascript-object (POJO) with deeply nested objects and arrays and with the 'branches' of this 'state tree' terminating in js primitives or class objects
-   in this example, the main part of the state is a feed of contacts, which looks roughly like this:

```js
state = {
    contactfeed:[
        {
            id: "XXX",
            firstName: "Magnus",
            lastName: "Carlsen",
            email: "magnus@carlsen.com",
            active: true,
            dateCreated: Date,
            phoneNumbers: [
                {
                    countryCode: {
                        code: "+1",
                        name: "United States"
                    }
                    dialNumber: "000 111 2222",
                    phonetype: "mobile"
                },
                ...
            ]
        },
        ...
    ]
}
```

-   when you store (parts of) your state in a document DB like Mongo, when you transmit it across a network as a JSON, and when you move it around the backend and parts of the client app, you want to interact with your data as POJOs and JS arrays (not as immutables)
-   when you store your state as part of a frontend redux state connected to your smart components, the received wisdom is that you interact with your data as immutable structures
-   to have the best of all worlds, you therefore need to be able to smartly convert from POJOs to immutable structures and vice-versa; accomplishing this while (i) provisioning your POJOs and immutables with type safety AND (ii) not violating the DRY principle is a very difficult intersection of desiderata to obtain, and this architecture is designed to get as close as possible to those goals

## Architecture

When designing a full-stack webapp based on this architecture, follow these rough steps in order to organize your data structures:

1. Design a single POJO containing (in general) deeply nested JS objects and arrays to represent the state of your data in the frontend
2. Break down each layer of the POJO into objects, arrays and JS primitives so that each sub-POJO can be contained in its own file within this `models` directory.
   2.1. For example, the contact model above has an array of phone-number objects, which can be modelled within a file called `PHONENUMBER.ts`
3. Within each such model file, we create a `namespace` of the same name. Within this namespace, we shall contain _everything_ to do with that model: typing/default-values/demo-values/immutable-conversion/validation, etc.
4. Wherever you are in the code base, whenever you want to build/reference some section of your state tree, whether it be the POJO or the corresponding 'immutable payload', you simply import the section of the state tree you want from the corresponding namespace found in this directory (and accessed with the alias '**MODELS' as in `import { CONTACT } from '**MODELS'`) and, using dot notation, summon the type/object/function that you want.
    1. For example, if you want to access the interface for the phone-number POJO, you import the `PHONENUMBER namespace` and then reference `PHONENUMBER.Interface`
5. This architecture uses consistent labelling of data structures as found in `TEMPLATE.ts`. Whenever you want to add a new data structure to your state tree, you need to create a NAMESPACE with the following inner constituents:

-   An interface (always named `Interface` here, but you can customize if you prefer) for the POJO representation; this is the primary/defining source of truth for the data structure and will provide the 'backbone' so-to-speak for generating a corresponding 'immutable payload'
-   A POJO of type `Interface` giving the default values for newly generated JS instances of this model. This POJO is always named `Default`. Typically, these values will be empty/boring.
-   Optionally, a POJO of type `Interface` giving demonstration values for JS instances of this model. This POJO is always named `Demo` and is mainly used for development.
-   A generator function returned from `getImmutableGenerator`, which accepts `Interface` as a type generic and the `Default` POJO as its compulsory argument. The returned generator function is always named `genIm`, and is called _without_ the `new` keyword to create what we're calling here a new "immutable payload"
-   The 'immutable payload' is what we call the specially created immutable 'object' that's created by, and that structurally mirrors, the model's Default POJO. It is essentially an object generated using immutable's `fromJS()` on the Default POJO, and endowed with customized methods and typings that enable us to work with immutable versions of the state POJOs with fairly comprehensive type safety.
-   NOTE: the special term 'immutable "payload"' is used here to indicate that it's not just any old immutable object, but a specially constructed/typed entity specific to this architecture.
    -   For example, the immutable payload `const payload = CONTACT.ImGen()` will have the method `.getIn()`, just as all immutable methods do, but its typings will be specific to the `CONTACT.Interface` defined in the same `CONTACT` namespace.
-   Optionally, the model's namespace can also be used to specify customized functions for the immutable payload, functions for deserealizing/validating (prospective) instances of that model, etc.
-   The overall idea is that whenever you want something to do with a model like a phonenumber, you can quickly find it in exactly one source of truth here by calling the namespace, using dot notation to trigger VSCode intellisense, and quickly gain access to the proprety/resource you're intrested in anywhere in the codebase.

## Metatyping

-   Much thought has gone into ensuring minimal work/repetition is required whenever you want to adjust your redux state tree, and to make type safety and intellisense as clear/robust as Typescript allows. This is achieved by placing the bulk of the common boilerplate in the dir `metatyping`.
-   The file `metatyping/index.ts` defines the generator function for converting the Default POJO to an immutable payload with types. Each model that you build needs to import the function `metatyping/index/getImmutableGenerator` and call it like so within the namespace
-   If the POJO representing some substate (e.g. a phone number) is itself composed of other substate POJOs, then they need to be imported and added to the substate POJO in question. This will make types clearer when traversing derived immutable payloads (see below);
-   Sometimes a customized type is useful but not worth breaking out into its own model; in such a case, place the customized type in the appropriate namespace, as with `TPhoneType` in the following example:

```ts
//models/PHONENUMBER.ts
import { getImmutableGenerator, getImType } from "./metatyping"; //DO NOT REMOVE - every model needs this
import { COUNTRYCODE } from "./COUNTRYCODE";

export namespace PHONENUMBER {
    //
    export type TPhoneType = "mobile" | "home"; //Not worth separating into own file

    export interface Interface {
        countryCode: COUNTRYCODE.Interface;
        dialNumber: string;
        phoneType: TPhoneType;
    }

    export const Default: Interface = {
        countryCode: COUNTRYCODE.Default,
        dialNumber: "000 000 0000",
        phoneType: "home"
    };

    export const Defaults: Interface[] = [];

    export const Demo: Interface = {
        countryCode: COUNTRYCODE.Demo,
        dialNumber: "000 111 222",
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
        // ...
        }
    }


    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}
```

-   In the example above, we can now easily reference anything to do with the PHONENUMBER model anywhere in the codebase by importing the namespace and accessing its contents with dot notation; e.g.:

```ts
import { PHONENUMBER } from "__MODELS";
const defaultCopy: PHONENUMBER.Interface = PHONENUMBER.Default;
const arrayOfDefaultCopies: PHONENUMBER.Interface[] = PHONENUMBER.Defaults;
const demoCopy: PHONENUMBER.Interface = PHONENUMBER.Demo;
const arrayOfDemoCopies: PHONENUMBER.Interface[] = PHONENUMBER.Demos;
const immutablePayloadWithDefaultValues: PHONENUMBER.ImType = PHONENUMBER.genIm();
const immutablePayloadWithDemoValues: PHONENUMBER.ImType = PHONENUMBER.genIm(PHONENUMBER.Demo);
const validatedPhoneNumbers: PHONENUMBER.Interface[] = PHONENUMBER.validate(arrayOfPossiblePhoneNumbers);
```

-   Note: the alias `__MODELS` is set in `tsconfig.json` and made available to webpack via `tsconfig-paths-webpack-plugin` in `webpacking/webpack.common.config.ts`.

## Working With Your Data

This boilerplate provides a fairly detailed implementation of a contact-organization app showing how you can build a frontend immutable state tree from models in this dir, connect your state to smart react components, update the state tree in the frontend by pushing actions through reducers, and communicate with an express-mongo backend that uses corresponding POJOs. Here is a rough flow of how to set up and work with your data:

-   When working with redux and immutable, you want to build up a POJO state tree defined in a model in a file called `ROOTSTATE.ts`, which is itself built of arbitrarily many layers of nested POJOs/arrays based on models defined in separate files in this models' directory.
-   In `src/webapp/redux/reducers/index.ts`, we define a `rootreducer` controlling the immutable state tree; the structure of this rootreducer corresponds precisely with the rootstate defined in `ROOTSTATE.ts`. The rootreducer combines other reducers defined in separate files in `src/webapp/redux/reducers` that govern the various branches of the tree (and that correspond to the values of the `Default` in `ROOTSTATE.ts`.
-   The state tree is connected to smart react components as demonstrated in the `src/webapp/containers` dir. In this architecture, we use `reselect` to cache in memory calls to the redux store (see `src/webapp/selectors`).

## Type Widening and Narrowing

The approach to types taken in this architecture takes us a long way to type safety, but it cannot take us all the way unfortunately due to `type widening`. Basically, typescript is happy to give you conditional types two layers into an object, but after that it starts returning type combinations for _all_ possible paths through a deeply nested object.

This has two annoying consequences.

Firstly, typescript will not complain if you 'mix different paths' together. (TOD): give an example of what that means). Fortunately, it's quite rare that you would do that, and it doesnt disrupt the main thing that typescript helps you with: catching typos and easy refactoring.

Secondly, it makes your intellisense hard to work with, since, if you have a types issue, typescript will want to report to you ALL of the possible key combinations that can't be assigned to (typically) the simple type you want. Some effort has been made to alleviate this problem in the metatyping by using the 'Exclude<>' operator, but this doesnt always work and, sometimes might even make it worse :(

## Final Conclusions

-   Using immutable in your architecture adds a lot of complexity and, at this point in time, makes it extremely difficult to have comprehensive type safety and human-friendly intellisense.

-   If in the future the typescript architects can improve the 'types-widening' problem, then immutable types could work really well; until then, immutable doesn't seem worth it (i.e. see this architecture as an excersize).

-   If you're worried about performance, then it's not obvious that immutable makes your app perform better (all else being equal); if you're worried about accidental state-mutation and debugging difficulties that result, well, yeah, that's going to add complexity to your overall development experience, but then immutable adds plenty of complexity. My overall feeling is that you're better off securing super-strong typings with POJOs to avert bugs than deal with the complexity of immutable. If you're worried about accidental mutations, then Readonly<> is your friend. If you're working with pure JS then, yes, immutable probably makes your life easier, but I'll take typescript over immutable any day of the week.
