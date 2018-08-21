# Fortawesome Typings & Wrappers

-   "fortawesome" is a project originating from "fontawesome" with the goal of enabling you to import just those fontawesome icons that you need (and not -- as it was done in the old school -- having to import ever single fontawesome icon into your bundle)

-   This dir is dedicated to React-component wrappers around @fortawesome icons.

-   If you want to add more fontawesome icons to your bundle, then you can see what's freely available [here](https://fontawesome.com/icons?d=gallery). I'd recommend wrapping it in a dedicated local component in @FortawesomeWrappers in order to (i) be consistent, and (ii) to ensure it has proper typings applied

-   When creating a fortawesome wrapper, use the `interface` defined in `@FortawesomeProps.ts` to ensure you have proper typings. If you want to add custom props, then create a local interface and then use the `&` typescript operator to combine them. Copying and editing from existing items in this dir is the surest way to go.

-   BEWARE! Do not import svg's like this:

```ts
import { faPlay, faPause } from "@fortawesome/fontawesome-free-solid";
```

... or you'll end up importing the _entire_ font-awesome collection (at ~0.5Mb)! Instead, import items individually like so:

```ts
import faPlay from "@fortawesome/fontawesome-free-solid/faPlay";
import faPause from "@fortawesome/fontawesome-free-solid/faPause";
```
