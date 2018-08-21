# NOTES ON SELECTORS

Why selectors with reselect's `createSelector`?

Basic redux setup has you map the props you'll need in your container to the redux state by means of the function
`mapStateToProps`, which has the form `state => { propsA: stateA, ... }`, and that gets passed into the redux connect function.

In general, each prop will be a function of aspects of the redux state, and the logic within `mapStateToProps` can be made arbitrarily complex. Each time you rerender the component, the basic setup will cause each prop to be recomputed. However, since functions that read/write to the redux state are supposed to be pure functions, the recomputation of each prop from the state is wasteful, and an optimized set up will only recompute (the heavy logic of) the props when the parts of the state that it depends on change. That's what `reselect` is supposed to do.

(i) It separates any logic that might be required to compute a container's prop. Often a prop is just a simple reading of some part of the state, but sometimes a prop might be a function of different components of the entire state; let's call these `compound values`. The patterns recommended by reselect carry out this logic to compute compound values in a separate `selectors.ts` file, and, as we shall see, this makes the mapStateToProps function in the container file little more than a set of key-value pairs that map these compund values computed from redux state to props.

(ii) reselect is designed to only recompute compound values when the (lets call them) `elemental values` of the state change. This can improve efficiency and performance.

(iii) optionally, placing all of your read-and-compute-from-redux-state logic into a separate selectors file creates a convenient and consistent place to switch from immutable structures (which the redux state is composed of) back to vanilla typescript, and we shall do that in this codebase. This means that immutable.js will only be found in the selectors file (where we get data from the redux state) and in the reducers files (where we alter/add to the redux state), and everywhere else in the codebase is typescript.
