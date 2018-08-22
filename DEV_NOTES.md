# What Is This?

These are misc notes made along the windy development path towards boilerplate nirvana

## ts-loader vs awesome-typescript-loader (at-loader)

Did some comparison tests between the two major ts loaders used in webpack-based environments. at-loader is a bit slower to get started (typically 5-10 secs longer), and its hot-module-loading seems to be ~1 sec slower. For that reason -- for now at least -- I'm going to remove at-loader, but it seems easy to swap back in at a later date.
