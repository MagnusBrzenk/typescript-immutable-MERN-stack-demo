import { TCommonKeynames } from "./_TCommonKeynames";
import { getImType } from "__METATYPING";

/**
 * Define overloaded types for methods:
 * get
 * getIn
 * getIn*
 */
export interface GetMethods<T> {
    //

    get<K1 extends keyof T>(
        key: T extends any[] ? number : K1,
        def?: any
    ): getImType<T extends any[] ? T[number] : T[K1]>;
    //1 ARG
    getIn<K1 extends keyof T>(
        keys: [T extends any[] ? number : K1]
    ): getImType<Exclude<T extends any[] ? T[number] : T[K1], TCommonKeynames>>;
    //2 ARGS
    getIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        //Plain Keys
        K1 extends keyof T,
        K2 extends keyof T[K1]
    >(
        keys: [
            T extends any[] ? number : K1,
            T extends any[] ? (V1 extends any[] ? number : keyof V1) : (T[K1] extends any[] ? number : K2)
        ]
    ): getImType<Exclude<V2, TCommonKeynames>>;
    //3 ARGS
    getIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2
    >(
        keys: [
            //
            Exclude<C1, TCommonKeynames>,
            Exclude<C2, TCommonKeynames>,
            Exclude<C3, TCommonKeynames>
        ]
    ): getImType<Exclude<V3, TCommonKeynames>>;
    //4 ARGS
    getIn<
        //Values
        V0 extends T,
        V1 extends V0 extends Array<infer U> ? U : V0[keyof V0],
        V2 extends V1 extends Array<infer U> ? U : V1[keyof V1],
        V3 extends V2 extends Array<infer U> ? U : V2[keyof V2],
        V4 extends V3 extends Array<infer U> ? U : V3[keyof V3],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3
    >(
        // keys: [C1, C2, C3, C4]
        keys: [
            Exclude<C1, TCommonKeynames> extends never ? C1 : Exclude<C1, TCommonKeynames>,
            Exclude<C2, TCommonKeynames> extends never ? C2 : Exclude<C2, TCommonKeynames>,
            Exclude<C3, TCommonKeynames> extends never ? C3 : Exclude<C3, TCommonKeynames>,
            Exclude<C4, TCommonKeynames> extends never ? C4 : Exclude<C4, TCommonKeynames>
        ]
    ): getImType<Exclude<V4, TCommonKeynames>>;
    //5 ARGS
    getIn<
        //Values
        V0 extends T,
        V1 extends V0 extends Array<infer U> ? U : V0[keyof V0],
        V2 extends V1 extends Array<infer U> ? U : V1[keyof V1],
        V3 extends V2 extends Array<infer U> ? U : V2[keyof V2],
        V4 extends V3 extends Array<infer U> ? U : V3[keyof V3],
        V5 extends V4 extends Array<infer U> ? U : V4[keyof V4],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3,
        C5 extends V4 extends any[] ? number : keyof V4
    >(
        // keys: [C1, C2, C3, C4, C5]
        keys: [
            Exclude<C1, TCommonKeynames>,
            Exclude<C2, TCommonKeynames>,
            Exclude<C3, TCommonKeynames>,
            Exclude<C4, TCommonKeynames>,
            Exclude<C5, TCommonKeynames>
        ]
    ): getImType<Exclude<V5, TCommonKeynames>>;
    //6 ARGS
    getIn<
        //Values
        V0 extends T,
        V1 extends V0 extends Array<infer U> ? U : V0[keyof V0],
        V2 extends V1 extends Array<infer U> ? U : V1[keyof V1],
        V3 extends V2 extends Array<infer U> ? U : V2[keyof V2],
        V4 extends V3 extends Array<infer U> ? U : V3[keyof V3],
        V5 extends V4 extends Array<infer U> ? U : V4[keyof V4],
        V6 extends V5 extends Array<infer U> ? U : V5[keyof V5],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3,
        C5 extends V4 extends any[] ? number : keyof V4,
        C6 extends V5 extends any[] ? number : keyof V5
    >(
        // keys: [C1, C2, C3, C4, C5, C6]
        keys: [
            Exclude<C1, TCommonKeynames>,
            Exclude<C2, TCommonKeynames>,
            Exclude<C3, TCommonKeynames>,
            Exclude<C4, TCommonKeynames>,
            Exclude<C5, TCommonKeynames>,
            Exclude<C6, TCommonKeynames>
        ]
    ): getImType<Exclude<V6, TCommonKeynames>>;

    ////////////////////////////////////////////////////////////////////////////////////////
    //
    //  GETIN WRAPPED METHODS
    //
    // Space for creating extra not-overloaded 'experimental' getIn methods without disrupting
    // the better established versions above; these are only for types exploration and do not
    // have any 'real' corresponding methods
    //
    ////////////////////////////////////////////////////////////////////////////////////////

    //1 ARG
    getIn1<
        //Plain Keys
        K1 extends keyof T
    >(
        keys: [T extends any[] ? number : K1]
    ): getImType<Exclude<T extends any[] ? T[number] : T[K1], TCommonKeynames>>;
    //2 ARGS
    getIn2<
        //Values
        V0 extends T,
        V1 extends [V0] extends [any[]] ? V0[number] : V0[keyof V0],
        V2 extends [V1] extends [any[]] ? V1[number] : V1[keyof V1],
        //Plain Keys
        K1 extends keyof T,
        K2 extends keyof T[K1],
        //Intell Keys
        C1 extends [V0] extends [any[]] ? number : keyof V0,
        C2 extends [V1] extends [any[]] ? number : keyof V1
    >(
        keys: [Exclude<C1, TCommonKeynames>, Exclude<C2, TCommonKeynames>]
    ): getImType<Exclude<V2, TCommonKeynames>>;
    //3 ARGS
    getIn3<
        //Values
        V0 extends T,
        V1 extends [V0] extends [any[]] ? V0[number] : V0[keyof V0],
        V2 extends [V1] extends [any[]] ? V1[number] : V1[keyof V1],
        V3 extends [V2] extends [any[]] ? V2[number] : V2[keyof V2],
        //Intell Keys
        C1 extends [V0] extends [any[]] ? number : keyof V0,
        C2 extends [V1] extends [any[]] ? number : keyof V1,
        C3 extends [V2] extends [any[]] ? number : keyof V2
    >(
        keys: [C1, C2, C3]
    ): getImType<Exclude<V3, TCommonKeynames>>;
    //4 ARGS
    getIn4<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3
    >(
        keys: [C1, C2, C3, C4]
    ): getImType<Exclude<V4, TCommonKeynames>>;
    //5 ARGS
    getIn5<
        //Values
        V0 extends T,
        V1 extends V0 extends Array<infer U> ? U : V0[keyof V0],
        V2 extends V1 extends Array<infer U> ? U : V1[keyof V1],
        V3 extends V2 extends Array<infer U> ? U : V2[keyof V2],
        V4 extends V3 extends Array<infer U> ? U : V3[keyof V3],
        V5 extends V4 extends Array<infer U> ? U : V4[keyof V4],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3,
        C5 extends V4 extends any[] ? number : keyof V4
    >(
        keys: [
            Exclude<C1, TCommonKeynames>,
            Exclude<C2, TCommonKeynames>,
            Exclude<C3, TCommonKeynames>,
            Exclude<C4, TCommonKeynames>,
            Exclude<C5, TCommonKeynames>
        ]
    ): getImType<Exclude<V5, TCommonKeynames>>;
    //6 ARGS
    getIn6<
        //Values
        V0 extends T,
        V1 extends V0 extends Array<infer U> ? U : V0[keyof V0],
        V2 extends V1 extends Array<infer U> ? U : V1[keyof V1],
        V3 extends V2 extends Array<infer U> ? U : V2[keyof V2],
        V4 extends V3 extends Array<infer U> ? U : V3[keyof V3],
        V5 extends V4 extends Array<infer U> ? U : V4[keyof V4],
        V6 extends V5 extends Array<infer U> ? U : V5[keyof V5],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3,
        C5 extends V4 extends any[] ? number : keyof V4,
        C6 extends V5 extends any[] ? number : keyof V5
    >(
        keys: [
            Exclude<C1, TCommonKeynames>,
            Exclude<C2, TCommonKeynames>,
            Exclude<C3, TCommonKeynames>,
            Exclude<C4, TCommonKeynames>,
            Exclude<C5, TCommonKeynames>,
            Exclude<C6, TCommonKeynames>
        ]
    ): getImType<Exclude<V6, TCommonKeynames>>;
}
