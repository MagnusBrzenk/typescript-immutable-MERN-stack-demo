import * as Immutable from "immutable";
import { TCommonKeynames } from "./_TCommonKeynames";
import { DeleteMethods } from "./DeleteMethods";
import { GetMethods } from "./GetMethods";
import { SetMethods } from "./SetMethods";
import { UpdateMethods } from "./UpdateMethods";

/**
 * THIS FILE IS CENTRAL TO THE ARCHITECTURE OF THIS TYPESCRIPT-MERN-IMMUTABLE BOILERPLATE
 * This File Has Two Main Exports:
 * 1. template function returning generator of deeply nested immutable payload
 * 2. template type to apply to instances of that generator
 */

//Define types for Immutable Map (M) and List (L) stripped of types for methods that we're going to add back in but customized
type OmitInImmutableListAndMap =
    | "delete"
    | "get"
    | "set"
    | "update"
    | "deleteIn"
    | "getIn"
    | "setIn"
    | "updateIn"
    | "map"
    | "toJS";

type OmitInJustImmutableList = "push" | "concat" | "filter" | "findIndex";
export type L = Omit<Immutable.List<any>, OmitInImmutableListAndMap | OmitInJustImmutableList>;
export type M = Omit<Immutable.Map<any, any>, OmitInImmutableListAndMap>;

/**
 * Interface to provide the deeply-nested immutable payloads to be generated with types for their main immutable methods
 * The type input `T` is the POJO interface that provides the nested-key info
 */
export interface ImMethodsInterface<T> extends DeleteMethods<T>, GetMethods<T>, SetMethods<T>, UpdateMethods<T> {
    //
    // MISC METHODS
    //
    toJS<T>(): T;

    push<V1 extends T extends any[] ? T[number] : T[keyof T]>(val: getImType<V1>): getImType<T>;

    filter<V1 extends T extends any[] ? T[number] : never>(
        cb: (el: V1 extends TPrimitives ? V1 : getImType<V1>, ind?: number) => boolean
    ): getImType<T>;

    map<V1 extends T extends any[] ? T[number] : never>(
        cb: (el: any, ind?: number, arr?: any) => any
    ): getImType<any[]>;

    findIndex<V1 extends T extends any[] ? T[number] : never>(
        cb: (el: V1 extends TPrimitives ? V1 : getImType<V1>) => boolean
    ): number;

    groupBy<V1 extends T extends any[] ? T[number] : never>(
        cb: (el: V1 extends TPrimitives ? V1 : getImType<V1>) => any
    ): Immutable.OrderedMap<any, any>;

    concat<T>(val: T extends TPrimitives ? T : getImType<T>): getImType<T>;
}

/**
 * Main function that returns a function that
 * (i) accepts (a partial of) an object of type T (viz. the interface for the default POJO), and
 * (ii) returns an corresponding deeply nested Immutable 'object'
 *
 * NOTE: the "deeply nested Immutable 'object'" is constructed using immutable's 'record' structure.
 * However, immutable records do not generate deeply nested immutable structures; since we are using the
 * record to construct a class that uses `fromJS` in its constructor, we are essentially obviating all of its distinctive properties
 *
 * (i) have the methods and prototype structure of an immutable record, and
 * (ii) is seeded using fromJS() so that deeply nested structures are converted to immutable objects.
 * Note: by returning `any`, we are essentially throwing away all type information for this class;
 * that shall all be provided by `getImType<T>` when
 * @param defaultObject -- the POJO to be deeply converted to immutable object
 */
export function getImmutableGenerator<T>(defaultPOJO: T): (params?: Partial<T>) => getImType<T> {
    return function(params?: Partial<T>): getImType<T> {
        //
        const deeplyNestedImmutableMapsAndOrLists = Immutable.fromJS({
            ...(defaultPOJO as any),
            ...(params as any)
        });

        const immutablePayload: getImType<T> = {
            //Have to set the __proto__ property of our immutable payload explicitly because the spread operator won't include it
            __proto__: deeplyNestedImmutableMapsAndOrLists.__proto__,
            ...deeplyNestedImmutableMapsAndOrLists //Immutable equivalent of our (in general) deeply-nested-plain-old-JS-objects-and-arrays
        };
        return (immutablePayload as any) as getImType<T>;
    };
}

/**
 * The main exported type to be applied to instances of the class returned by the main exported function
 * NOTE: It's optional whether to apply `& T` to this type; if you do, you'll be able to use dot notation on your immutable records
 * to inspect the nested children of your immutable objects via VSCode's intellisense, but you cannot leave dot notation in your code
 * because we used fromJS() in the class constructor to convert everything to immutable Maps and Lists.
 */
type TPrimitives = string | number | boolean | null;
export type getImType<T> = [T] extends [TPrimitives] // //
    ? T
    : ImMethodsInterface<T> &
          //
          ([T] extends [any[]] ? L : M) &
          Exclude<T, "map" | "concat" | TCommonKeynames>; //

//   getImType<Exclude<V3, TCommonKeynames>>;
