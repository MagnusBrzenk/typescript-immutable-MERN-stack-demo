# NOTES on Containers

## Redux/Typescript/Reselect

Getting the redux store to connect to smart components ('containers') via reselect memoizers and proper typings is tricky. Detailed comments have been added to `Contactfeed` to try to make clear what's going on.

NOTE: If you're new to redux, stores, etc. then this may not be the best place to get introduced since it's a lot to absorb and, in addition to the basic concepts (which themsevles take time to absorb), we also add a lot of typescript jazz into the mix.

### Overview

-   Containers can get their props either from their parent component, or from the redux store. We can call these 'dumb props' and 'smart props' respectively. Redux is designed to connect to your smart components in such a way that whenever its store updates, the smart props that depend on it will automatically update.
-   Note: the following words get used somewhat interchangeably:
-   -   '[redux] state' <-> '[redux] store' <-> '[redux] tree'
-   -   '[redux] substates' <-> '[redux] branches'
-   -   'smart component' <-> 'container'
-   -   'dumb component' <-> 'component'

### Reselect

Reselect lets you extract data from the redux store without having to recompute everything every single time there is an update to the smart props. For more details, see [here](https://www.npmjs.com/package/reselect), else just think of reselectors as an extra step that gets included between the redux state and the smart component.
