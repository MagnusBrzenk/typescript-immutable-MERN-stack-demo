# NOTES ON ACTIONS

## Overview

All actions are placed in `index.ts` under the `namespace actions`. Within that namespace are definitions for (i) types of actions, and (ii) action creators.

Note: there is potential confusion here between `type` (as in the typescript concept) and `type` as in the key labelled `type` in redux actions. The latter shall be referred to here as `type key`.

The possible `type keys` are created as an `Enum` within the namespace, and the action creators are created using the `createAction` function from `"redux-actions"`. The `createAction` function accepts one argument as value to be paired with the action's `type key` field. If no `type` is supplied to `createAction`, then the action is presumed to not have a payload by the TS server. If a type `T` is supplied to `createAction<T>(ARG)` then the action to be created will be expected to have a payload of that `type`. See [here](https://redux-actions.js.org/docs/api/createAction.html).
