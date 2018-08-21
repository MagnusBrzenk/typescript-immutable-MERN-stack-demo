# Typescript-MERiN Boilerplate

## Typescript-Mongo-Express-React-immutable-Node

### Project TODOs

-   Security: Implement much better authorization with e.g. passport, web tokens, etc.
    -- Local storage: enable authorized user to remain authorized for ~24 hours
    -- user-specific actions
-   Search: at the moment word search is only local -- needs to query actual DB
-   Testing: add mocha and karma frameworks with some demo tests
-   Clean up metatyping and try to implement 'clothed conditionals'
-   Server rate limiting with e.g. express-brute
-   Improve partitioning of webpacking of ts/tsx files for back- and frontends (a compiler error on the backend is not to affect webpakcing of fronted and vice-versa!)

### Intro

TODO -- here's the outline

-   Web dev has roughly 2 parts: understanding your architecture, and building the details of your app
-   This project is all about investing heavily in the first to serve the second
-   DRY is supremely important to this approach
-   Full-stack architectures are few and too few in between: ok, we have a todo app, but MERN/MEAN 'should' be all about capitalizing on common structures writeen in .ts/tsx between both frontend and backend; i.e. the community needs more full-stack demos!
-   Arguments for/against this immutable approach
    -- Standard arguments for/against immutable
    -- immutable isn't net worth it but, as an excersize, let's see how we can best make it work with typescript
    -- Disatisfaction with records

### Local Setup

TODO -- here's the outline

-   Frontend
-   Env vars
-   Express server
-   Mongo Server

### File Structure

TODO

### Details

#### Transpiling ts/tsx -> js

There are a few ways to get ts/tsx down to 'rock-bottom' js usable in any browsers worth worrying about. After some experimentation, I ended up using the `ts-loader` in webpack to convert `ts/tsx` to `js/jsx`

##### .babelrc

-   Presets: we use Babel's `env` preset to transpile to rock-bottom JS, and the `react` preset to ... [TODO]

##### .env

For local development, copy .env-template to .env, and supply values for 'XXX'. For production runs on e.g. Heroku, add environment variables in your dashboard (e.g. for Heroku use `settings > Config Vars`).
