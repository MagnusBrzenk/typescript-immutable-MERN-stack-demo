import { TCommonKeynames } from "./_TCommonKeynames";
import { getImType } from "__METATYPING";
import { TPrimitives } from "./_TPrimitives";

/**
 * Define overloaded types for methods:
 * update
 * updateIn
 * updateIn*
 */
export interface UpdateMethods<T> {
    //

    update<
        //Values
        V0 extends T,
        V1 extends T extends any[] ? T[number] : T[keyof T],
        //Intell Keys
        K1 extends T extends any[] ? number : keyof T
    >(
        key: T extends any[] ? number : K1,
        cb: (nested: V1 | getImType<V1>) => V1 | getImType<V1>
    ): getImType<Exclude<T, TCommonKeynames>>;
    //1 ARG
    updateIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        //Intell Keys
        K1 extends T extends any[] ? number : keyof T
    >(
        keys: [(T extends any[] ? number : K1)],
        cb: (nested: getImType<V1>) => getImType<V1>
    ): getImType<Exclude<T, TCommonKeynames>>;
    //2 ARGS
    updateIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        //Plain Keys
        K1 extends keyof T,
        K2 extends keyof T[K1]
    >(
        keys: [
            (T extends any[] ? number : K1),
            (T extends any[]
                ? (T[number] extends any[] ? number : keyof T[number])
                : (T[K1] extends any[] ? number : keyof T[K1]))
        ],
        cb: (nested: V2 extends TPrimitives ? V2 : getImType<V2>) => V2 extends TPrimitives ? V2 : getImType<V2>
    ): getImType<Exclude<T, TCommonKeynames>>;

    //3 ARGS
    updateIn<
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
        ],
        cb: (nested: getImType<V3>) => getImType<V3>
    ): getImType<Exclude<T, TCommonKeynames>>;
    //4 ARGS
    updateIn<
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
        keys: [C1, C2, C3, C4],
        cb: (nested: V4) => V4
    ): getImType<Exclude<T, TCommonKeynames>>;
    //5 ARGS
    updateIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        V5 extends V4 extends any[] ? V4[number] : V4[keyof V4],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3,
        C5 extends V4 extends any[] ? number : keyof V4
    >(
        keys: [C1, C2, C3, C4, C5],
        cb: (nested: V5) => V5
    ): getImType<Exclude<T, TCommonKeynames>>;
    //6 ARGS
    updateIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        V5 extends V4 extends any[] ? V4[number] : V4[keyof V4],
        V6 extends V5 extends any[] ? V5[number] : V5[keyof V5],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3,
        C5 extends V4 extends any[] ? number : keyof V4,
        C6 extends V5 extends any[] ? number : keyof V5
    >(
        keys: [C1, C2, C3, C4, C5, C6],
        cb: (nested: V6) => V6
    ): getImType<Exclude<T, TCommonKeynames>>;

    ////////////////////////////////////////////////////////////////////////////////////////
    //
    //  updateIn WRAPPED METHODS
    //
    //  These extra non-overloaded deleteIn* methods are useful because your VSCode
    //  intellisense will be able to give you better diagnostic info if your path through
    //  the nested POJO is incorrect
    //
    ////////////////////////////////////////////////////////////////////////////////////////

    //1 ARG
    updateIn1<
        //
        K1 extends keyof T,
        V1 extends T extends any[] ? T[number] : T[K1]
    >(
        keys: [(T extends any[] ? number : K1)],
        cb: (nested: getImType<V1>) => getImType<V1>
    ): getImType<Exclude<T, TCommonKeynames>>;
    //2 ARGS
    updateIn2<
        //Plain Keys
        K1 extends keyof T,
        K2 extends keyof T[K1],
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1]
    >(
        keys: [
            (T extends any[] ? number : K1),
            (T extends any[]
                ? (T[number] extends any[] ? number : keyof T[number])
                : (T[K1] extends any[] ? number : keyof T[K1]))
        ],
        cb: (
            nested: // getImType<V2>
            V2 extends TPrimitives ? V2 : getImType<V2>
        ) => V2 extends TPrimitives ? V2 : getImType<V2>
    ): getImType<T>;
    //3 ARGS
    updateIn3<
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
        // keys: [C1, C2, C3],
        keys: [
            //
            Exclude<C1, TCommonKeynames>,
            Exclude<C2, TCommonKeynames>,
            Exclude<C3, TCommonKeynames>
        ],
        cb: (nested: getImType<V3>) => getImType<V3>
    ): getImType<Exclude<T, TCommonKeynames>>;
    //4 ARGS
    updateIn4<
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
        keys: [C1, C2, C3, C4],
        cb: (nested: V4) => V4
    ): getImType<Exclude<T, TCommonKeynames>>;
    //5 ARGS
    updateIn5<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        V5 extends V4 extends any[] ? V4[number] : V4[keyof V4],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3,
        C5 extends V4 extends any[] ? number : keyof V4
    >(
        keys: [C1, C2, C3, C4, C5],
        cb: (nested: V5) => V5
    ): getImType<Exclude<T, TCommonKeynames>>;
    //6 ARGS
    updateIn6<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        V5 extends V4 extends any[] ? V4[number] : V4[keyof V4],
        V6 extends V5 extends any[] ? V5[number] : V5[keyof V5],
        //Intell Keys
        C1 extends V0 extends any[] ? number : keyof V0,
        C2 extends V1 extends any[] ? number : keyof V1,
        C3 extends V2 extends any[] ? number : keyof V2,
        C4 extends V3 extends any[] ? number : keyof V3,
        C5 extends V4 extends any[] ? number : keyof V4,
        C6 extends V5 extends any[] ? number : keyof V5
    >(
        keys: [C1, C2, C3, C4, C5, C6],
        cb: (nested: V6) => V6
    ): getImType<Exclude<T, TCommonKeynames>>;
}
