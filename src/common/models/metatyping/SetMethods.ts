import { TCommonKeynames } from "./_TCommonKeynames";
import { getImType } from "__METATYPING";
import { TPrimitives } from "./_TPrimitives";

/**
 * Define overloaded types for methods:
 * set
 * setIn
 * setIn*
 */
export interface SetMethods<T> {
    //
    //1 ARG
    set<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        //Intell Keys
        K1 extends T extends any[] ? number : keyof T
    >(
        keys: K1,
        val: V1 extends TPrimitives ? V1 : getImType<V1>
    ): getImType<T>;
    //1 ARG
    setIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        //Intell Keys
        K1 extends T extends any[] ? number : keyof T
    >(
        keys: [K1],
        val: getImType<V1>
    ): getImType<T>;
    //2 ARGS
    setIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        //Intell Keys
        K1 extends T extends any[] ? number : keyof T,
        K2 extends V1 extends any[] ? number : keyof V1
    >(
        keys: [K1, K2],
        // val: getImType<V2>
        val: V2 extends TPrimitives ? V2 : getImType<V2>
    ): getImType<T>;

    //3 ARGS
    setIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        //Intell Keys
        K1 extends V0 extends any[] ? number : keyof V0,
        K2 extends V1 extends any[] ? number : keyof V1,
        K3 extends V2 extends any[] ? number : keyof V2
    >(
        keys: [K1, K2, K3],
        val: getImType<V3>
    ): getImType<T>;
    //4 ARGS
    setIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        //Intell Keys
        K1 extends V0 extends any[] ? number : keyof V0,
        K2 extends V1 extends any[] ? number : keyof V1,
        K3 extends V2 extends any[] ? number : keyof V2,
        K4 extends V3 extends any[] ? number : keyof V3
    >(
        keys: [K1, K2, K3, K4],
        // val: getImType<V4>
        val: V4 extends TPrimitives ? V4 : getImType<V4>
    ): getImType<T>;
    //5 ARGS
    setIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        V5 extends V4 extends any[] ? V4[number] : V4[keyof V4],
        //Intell Keys
        K1 extends V0 extends any[] ? number : keyof V0,
        K2 extends V1 extends any[] ? number : keyof V1,
        K3 extends V2 extends any[] ? number : keyof V2,
        K4 extends V3 extends any[] ? number : keyof V3,
        K5 extends V4 extends any[] ? number : keyof V4
    >(
        keys: [K1, K2, K3, K4, K5],
        // val: getImType<V5>
        val: V5 extends TPrimitives ? V5 : getImType<V5>
    ): getImType<T>;
    //6 ARGS
    setIn<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        V5 extends V4 extends any[] ? V4[number] : V4[keyof V4],
        V6 extends V5 extends any[] ? V5[number] : V5[keyof V5],
        //Intell Keys
        K1 extends V0 extends any[] ? number : keyof V0,
        K2 extends V1 extends any[] ? number : keyof V1,
        K3 extends V2 extends any[] ? number : keyof V2,
        K4 extends V3 extends any[] ? number : keyof V3,
        K5 extends V4 extends any[] ? number : keyof V4,
        K6 extends V5 extends any[] ? number : keyof V5
    >(
        keys: [K1, K2, K3, K4, K5, K6],
        val: getImType<V6>
    ): getImType<T>;

    ////////////////////////////////////////////////////////////////////////////////////////
    //
    //  setIn WRAPPED METHODS
    //
    //  These extra non-overloaded deleteIn* methods are useful because your VSCode
    //  intellisense will be able to give you better diagnostic info if your path through
    //  the nested POJO is incorrect
    //
    ////////////////////////////////////////////////////////////////////////////////////////

    //1 ARG
    setIn1<
        //Plain Keys
        K1 extends keyof T,
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0]
    >(
        keys: [K1],
        val: getImType<V1>
    ): getImType<T>;
    //2 ARGS
    setIn2<
        //Plain Keys
        K1 extends keyof T,
        K2 extends keyof T[K1],
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1]
    >(
        keys: [K1, K2],
        val: V2 extends TPrimitives ? V2 : getImType<V2>
    ): getImType<T>;

    //3 ARGS
    setIn3<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        //Intell Keys
        K1 extends V0 extends any[] ? number : keyof V0,
        K2 extends V1 extends any[] ? number : keyof V1,
        K3 extends V2 extends any[] ? number : keyof V2
    >(
        keys: [K1, K2, K3],
        val: getImType<V3>
    ): getImType<T>;
    //4 ARGS
    setIn4<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        //Intell Keys
        K1 extends V0 extends any[] ? number : keyof V0,
        K2 extends V1 extends any[] ? number : keyof V1,
        K3 extends V2 extends any[] ? number : keyof V2,
        K4 extends V3 extends any[] ? number : keyof V3
    >(
        keys: [K1, K2, K3, K4],
        // val: getImType<V4>
        val: V4 extends TPrimitives ? V4 : getImType<V4>
    ): getImType<T>;
    //5 ARGS
    setIn5<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        V5 extends V4 extends any[] ? V4[number] : V4[keyof V4],
        //Intell Keys
        K1 extends V0 extends any[] ? number : keyof V0,
        K2 extends V1 extends any[] ? number : keyof V1,
        K3 extends V2 extends any[] ? number : keyof V2,
        K4 extends V3 extends any[] ? number : keyof V3,
        K5 extends V4 extends any[] ? number : keyof V4
    >(
        keys: [K1, K2, K3, K4, K5],
        // val: getImType<V5>
        val: V5 extends TPrimitives ? V5 : getImType<V5>
    ): getImType<T>;
    //6 ARGS
    setIn6<
        //Values
        V0 extends T,
        V1 extends V0 extends any[] ? V0[number] : V0[keyof V0],
        V2 extends V1 extends any[] ? V1[number] : V1[keyof V1],
        V3 extends V2 extends any[] ? V2[number] : V2[keyof V2],
        V4 extends V3 extends any[] ? V3[number] : V3[keyof V3],
        V5 extends V4 extends any[] ? V4[number] : V4[keyof V4],
        V6 extends V5 extends any[] ? V5[number] : V5[keyof V5],
        //Intell Keys
        K1 extends V0 extends any[] ? number : keyof V0,
        K2 extends V1 extends any[] ? number : keyof V1,
        K3 extends V2 extends any[] ? number : keyof V2,
        K4 extends V3 extends any[] ? number : keyof V3,
        K5 extends V4 extends any[] ? number : keyof V4,
        K6 extends V5 extends any[] ? number : keyof V5
    >(
        keys: [K1, K2, K3, K4, K5, K6],
        val: getImType<V6>
    ): getImType<T>;
}
