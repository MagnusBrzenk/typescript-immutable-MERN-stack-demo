# NOTES ON REDUCERS ACTING ON IMMUTABLE STATES

## Overview

Following common approach, the redux state 'tree' is broken into sub 'branches' acted upon by separate reducers, one for each file in this dir.

## index.ts

The separate reducers are combined into a single `rootReducer` in `index.ts` using the `combineReducers` from `redux-immutable`. You can't apply type safety directly to `combineReducers` because its 1st/primary argument has type:

```ts
type ReducersMapObject<S = any, A extends Action<any> = Action<any>> = { [K in keyof S]: Reducer<S[K], A> };
```

Given the pojo-immutable structures set up in `__MODELS`, we can't directly apply types to `S` in the above formula because we are building the state with Immutable structures, and their types are given by `getImType<T>` which includes methods like `toJS()` (which can't be part of ReducersMapObject). To get round this, we simply use an intermediary type called `IReducerMappings` which maps the keys from the original `ROOTSTATE.Interface` to their corresponding immutable values `getImType<ROOTSTATE.Interface[K]>`.
