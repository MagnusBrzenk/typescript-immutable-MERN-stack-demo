# Typescript-MERiN Boilerplate

## Typescript-Mongo-Express-React-immutable-Node

### Project TODOs

-   Security: Implement much better authorization with e.g. passport, web tokens, etc.
    -   Local storage: enable authorized user to remain authorized for ~24 hours
    -   user-specific actions
-   Search: at the moment word search is only local -- needs to query actual DB
-   Testing: add mocha and karma frameworks with some demo tests
-   Clean up metatyping and try to implement 'clothed conditionals'
-   Server rate limiting with e.g. express-brute
-   Improve partitioning of webpacking of ts/tsx files for back- and frontends (a compiler error on the backend is not to affect webpakcing of fronted and vice-versa!)

### Intro

TODO -- here's the outline of the intro to be written:

-   Web dev has roughly 2 parts: understanding your architecture, and building the details of your app
-   This project is all about investing heavily in the first to serve the second
-   DRY is supremely important to this approach
-   Full-stack architectures are too few far in between: ok, we have lots of todo apps, but MERN/MEAN need to capitalize on ability to share js structures between both frontend and backend; i.e. the community needs more full-stack demos!
-   Arguments for/against this immutable approach
    -   Standard arguments for/against immutable
    -   `immutable` isn't net worth it but, as an excersize, let's see how we can best make it work with typescript
    -   Dissatisfaction with records
    -   etc.

### Local Dev Setup

These are instructions for setting up a local operating version of this app.

After cloning the repo, enter it. First, you need to set your environment variables. So copy the contents of `.env-template` to a new `.env` file. The app will work locally as is, but you might want to set the passwords, keys, etc. and, if you want image-uploading to work, you'll need to supply AWS credentials.

Next, open three shells of a unix terminal in the same directory (sorry -- I like to use bash scripts in my dev environment -- you'll have to adapt if you're using PCs).

Next, `yarn install` all your node packages.

Then, in the first terminal, get a mongodb instance going. With e.g. Mongo 3.4.4 installed locally, this can be done by entering:

```bash
mongod --dbpath 'path/to/your/db/if/not/in/default/location'
```

In the second terminal, build and start running your express server using nodemon with:

```bash
sh _devServer.sh
```

In the third terminal, start up the webpack-dev server for the frontend with:

```
sh _devWebapp.sh
```

If all goes well, the app will function from `http://localhost:3000/`. This repo uses webpack to bundle both the front and backend into low-level JS with source maps in the `dist` dir. This dir can be cleaned out on a regular basis (as it tends to accumulate a lot of junk, especially in dev mode).

### Local Production Setup

To simulate a deployed production version locally, this repo provides an intermediate `localprod` run. To use this, run

```bash
sh _buildLocal.sh
```

This will generate bundles for the front and backends in `dist`. This will also launch the webpack-bundle analyzer after your frontend bundle is complete, allowing you to inspect its contents. Once you exit from service, you can then run `node dist/server.js` and inspect the bundled interface being served by the express server just built at `http://localhost:5000/`.

#### VSCode

This repo comes with some settings for VSCode. If you use another IDE, then you're on your own. For a verified, positive experience, make sure you have the `prettier` extension enabled and that your `ts` and `tsx` files activate the typrscript server version 3.0.1. I also strongly recommend the VSCode extensions `Bracket Pair Colorizer` and `Indent-rainbow`.

### File Structure

#### Really short version

A lot fo thought has gone into building this architecture so that you can share as much code between the frontend and backend as possible, have one source of truth for (virtually) everything you do, readily convert between immutable and POJO represetntations of your apps data structures, and enjoy a productive development experience (with strong types throughout, hot-reloading, etc.).

#### Longer more useful version

TODO

### Tech Details

#### Transpiling ts/tsx -> js

There are a few ways to get ts/tsx down to 'rock-bottom' js usable in any browsers worth worrying about. After some experimentation, I ended up using the `ts-loader` in webpack to convert `ts/tsx` to `js/jsx`, and then babel to convert ES6 to the target of Babel's defaults in the 'env' preset (i.e. standard browser output).

#### CSS/LESS/SCSS

If you want global styles applied to your bundle, add them to `src/webapp/AppEntry/global.*`. If you want local modules for CSS/LESS/SCSS modules, then look at the examples in `src/webapp/Components/Templates`. If you want `styled-jsx` then you can see examples of its application in `Templates` and throughout this app.
