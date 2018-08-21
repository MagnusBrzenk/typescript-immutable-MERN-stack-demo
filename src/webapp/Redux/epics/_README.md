# NOTES ON EPICS

## What's this dir?

Epics are a concept/pattern from `redux-observable` that enable redux actions to be carried out with finely-controlled async chaining.

## Conventions

-   Actions suffixed with `_FULFILLED` are called on the completion of epics that were themselves triggered by actions, typically with the same root name. For example, `FETCH_FEED_FULFILLED` is an epic that, by convention, would only be triggered once the `FETCH_FEED` epic had completed.

## Example Breakdown

Observables and epics take some work to get the hand of them. An epic always maps a stream of actions (input `action$`) to an output stream of actions. Here's an example:

```ts
import { from, Observable } from "rxjs"; //Get types and/or observable-creation functions
import { mergeMap, map } from "rxjs/operators"; //Get piping operators

...

function getSetFeed(
    action$: Observable<Action<any>>,
    state$: { value: ROOTSTATE.ImType },
    dependencies: typeof epicDependencies
) {
    return action$.pipe(
        ofType(AppActions.Types.FETCH_MORE_CONTACTS),
        mergeMap(action =>
            from(dependencies.fetchFeedChunk(state$.value.get("contactFeed").get("feedchunks"))) //
                .pipe(map((response: any) => AppActions.fetchMoreContactsFulfilled(response)))
        )
    );
}
```

The first thing this function does is use the `pipe` method to take the present stream of actions `action$` and pipe it through a series of functions that, in turn, must collectively have a mapping of the form `action$ --> action$`. The first such piping function is `ofType` (supplied by redux-observable) which is probably intended to mimic a reducer, i.e. it just filters out of the input stream of `action$` leaving only the actions of the specified type. The next function is `mergeMap`. What does this do? Well, let's take a look at the callback that it operates on: the first argument in that callback is the action received from the piped action stream; in general, the callback can map that action to anything. In this case, each action is being mapped to a _new stream_ created by the `from` observable-creation function. That new stream is _not_ a stream of redux actions but, in this case, is the (special case) of a one-off event (viz. fulmillment of a fetch promise). The new stream is itself then piped through a function which maps events in the new stream from type `response: any` to a redux action (in this case, an action of type `FETCH_MORE_CONTACTS_FULFILLED`). So this inner pipeline outputs a stream of redux actions, and this brings us back to finalizing what `mergeMap` does: it takes the events in the inner stream and 'merges them' or 'pulls them up into' the top stream.

That's a bit opaque; here's an analogy to help make things clear.

Suppose you have an array: `const x = [1,2,3]` and you want to map it to some other array, say, one where you repeat each entry. If you try this `x.map(el => [el,el])` then you get `[[1,1],[2,2],[3,3]]`, which obviously isn't exactly what we want: we have an array of arrays, not the desired array of repeated elements `[1,1,2,2,3,3]`. ECMA 2018 is introducing a new `Array.propotype.flat()` method which will do this last step for us, pulling 'to the top' everything in our inner arrays. This is analogous to what `mergeMap` does: it pulls all of the events in the 'inner streams' out and into our single 'master stream' of sorts.

Without mergeMap in the above example, we'd be piping NOT to a stream of action$, but to a stream of streams of actions$. (Note: I use 'stream' and 'observable' in the rxjs contexts somewhat interchangeably).
