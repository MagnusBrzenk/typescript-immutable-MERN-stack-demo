# Typescript-MERiN Boilerplate

A Typescript-Mongo-Express-React-immutable-Node demo.

## Project TODOs

-   Security: Implement better authorization with e.g. passport, web tokens, etc.
    -   Local storage: enable authorized user to remain authorized for ~24 hours
    -   Enable user-specific actions
-   Search: at the moment word search is only local -- needs to query actual DB
-   Add loading spinners for waiting sequences

## Motivation

-   Web dev can be broken down into (at least) two parts: organizing/optimizing/understanding your architecture, and building out the specifics of your app
-   This project is all about investing heavily in the first to serve the second. The more you invest in designing and setting up your boilerplate, the more productive your coding will be in the long run
-   DRY is supremely important to this setup; several hard architectural trade offs had to be made, but never at the expense of DRY. Other codebases I came across in the course of research were willing to compromise on DRY, but in this codebase everything has a single source of truth.
-   The best (potential) thing about MERN/MEAN is their ability to share js structures between both frontend and backend. Not all MEAN/MERN setups take full advantage of this. There are lots of frontend todo apps out there, but not enough full-stack demos that have as their goal the efficient sharing and exchange of common data structures between the front and backend. Here are some specific goals of this setup:
    -   To make it so that when you jump between back- and frontends, you can continue to think in terms of the same data structures.
    -   To be able to readily convert between plain-old javascript objects (POJOs; used for network transfer, backend processing, and mongo storage) and deeply-nested immutable 'mirror' representations of those same POJOs (used in the frontend for redux-state storage and smart-component generation).
-   Experiment to see how well we can get immutable to cooperate with typescript.

## Getting Started

### Local Dev Setup

After cloning and entering the repo, fire up your editor and start installing the modules with e.g. `yarn install`.

First, we need to set our environment variables. So copy the contents of `.env-template` to a new `.env` file. The app will work locally as is, but you might want to customize the passwords and api-keys in your new `.env` file and, if you want image-uploading to work, you'll need to supply proper AWS credentials in the variables beginning with `AWS_`.

Next, open three shells of a unix terminal in the project's root directory (sorry -- I like to use bash scripts in my dev environment -- you'll have to adapt if you're using PCs). In the first terminal, get a local `mongodb` server going. With e.g. `Mongo 3.4.4` installed locally, this can be done with the command:

```bash
mongod [--dbpath 'path/to/your/db/if/not/in/default/location']
```

In the second terminal, make sure you have `nodemon` installed globally (or add it locally if you prefer), then build and start running your express server with:

```bash
sh _devServer.sh
```

In the third terminal, start up the webpack-dev-server for the frontend with:

```bash
sh _devWebapp.sh
```

If all goes well, the app will function from `http://localhost:3000/`, and both the frontend and backend will auto-reload whenever you make changes to their code. To get past the simple authorization, you need to use one of the passwords you would have included in the `.env` file. The default is `SIMPLE_AUTH_PASSWORDS='[XXX,YYY,ZZZ]'`.

### Local Production Setup

To simulate a deployed production version locally, this repo provides an intermediate `localprod` run. To use this, run

```bash
sh _buildLocal.sh
```

This will generate bundles for the front- and backends in a newly generated `dist` dir. This will also launch the webpack-bundle analyzer after your frontend bundle is complete, allowing you to inspect its composition in the browser window that it automatically brings up. Once you exit from that service, you can then run `node dist/server.js`, which will serve the bundled SPA by the express server just built at `http://localhost:5000/`.

### Deployment

Heroku is an easy and free/inexpensive platform on which to deploy a full-stack MERN application. Included here is a `Procfile` and script command `heroku-postbuild` that enables easy deployment via `git push heroku master` (after you've installed the heroku cli, etc.). You'll then need to copy/paste over your environment vars to heroku via its dashboard (or by using the heroku cli tool).

Finally, you'll need a mongodb service to connect your backend to. Most mongodb services will provide a free-light sandbox to connect to. Mongo atlas is straight forward to learn/use. Once you have a cluster set up and have obtained a uri, copy it over to your 'MONGODB_REMOTE_URI' env var in heroku, and hopefully your full-stack MERN app will be fully functional.

### VSCode

This repo comes with some settings for VSCode. If you use another IDE, then you're on your own. For a verified, positive experience, make sure you have the `prettier` extension enabled and that your `ts` and `tsx` files activate the typescript server version 3.0.1. I also strongly recommend the VSCode extensions `Bracket Pair Colorizer` and `Indent-rainbow`.

## File Structure

### Really short version

A lot of thought has gone into building this architecture so that you can share as much code between the frontend and backend as possible, have one source of truth for (virtually) everything you do, readily convert between immutable and POJO represetntations of your apps data structures, and enjoy a productive development experience (with strong types throughout, intellisense, hot-reloading, etc.).

### Longer more useful version

This codebase is arranged in four parts: `configuration`, `source code`, `resources`, and `testing`. Most of the configuration files are in the root directory, with the exception of webpack.configs which are given their own directory `webpacking`. The codebase has this approximate structure:

```
+-- _dist           //Will get generated by webpack
+-- _resources
|   +-- _data
|   +-- _images
|   +-- _scripts
|   +-- _styles
|   +-- index.html
|
+-- _testing
|
+-- _src
|   +-- _common
|   +-- _server
|   +-- _webapp
|
+-- _webpacking
|   +-- webpack.common.config.ts
|   +-- webpack.server.config.ts
|   +-- webpack.webapp.config.ts
|
+-- [startup-scripts-prefixed-with-'_']
+-- [other-config-files-and-READMEs]
```

The most important configuration details are found in `package.json` (of course), `tsconfig.json`, `.babelrc`, and the webpack config files in `./webpacking`. If you're new to any of these then, sorry, they're tedious to learn but necessary, so I've tried to be more verbose and comprehensive than most in putting these together.

The key thing to know is that webpack is running the bundling show but delegating transpilation to ts-loader and babel (who are in turn following instructions in `.babelrc` and `tsconfig.json` respectively).

#### Resources

```
.
.
.
+-- _resources
|   +-- _data
|   +-- _images
|   +-- _scripts
|   +-- _styles
|   +-- index.html
.
.
.
```

Everything in `./resources` is made available by the express server, i.e. place items here that you may not want to bundle into your react SPA. The `index.html` file is used as the template that webpack will edit and copy over into `dist`.

#### Source Code

All of the project's source code can be found in `src`. It has three directories: `common`, `server` and `webapp`.

```
.
.
.
+-- _src
|   +-- _common
|   +-- _server
|   +-- _webapp
.
.
.
```

###### src/common

```
.
.
.
+-- _src
|   +-- _common
|       +-- _constants
|       +-- _functions
|       +-- _models
|       +-- _types
.
.
.
```

As the name suggests, `common` is designed to house functions/structures/types/etc. used by either the frontend or the backend in a bid to have a single source of truth for everything in this codebase.

Of particular importance to this approach are the data-structure models created in `src/common/models`. The idea is that when you come to implement a complex application, you'll want to be able to think in terms of the exact same data structures on both the frontend and backend, and readily be able to access any function/type/creator related to that structure. I.e. we want a single source of truth for our full-stack application's key data structures, and those are found within individual `namespaces` within the `src/common/models` dir.

For example, if you want to represent a user (with properties like 'firstName', 'lastName' 'email', etc.), then you can store such an object in e.g. a noSQL database, and when it's requested from the frontend, you first extract it from the db, validate it's properties using an associated `validate()` function, send it across a network as a JSON object, then, using _the same_ validate() function, types, etc. for that structure on the frontend, convert it to an immutable representation, add it to your redux state and, throughout your components, reducers, selectors, epics, etc., you can confidently locate your types, generators, etc. for all your structures.

Here is a rough, highly-simplified schematic of the life cycle of a 'user' in its journey from the db to the frontend and back again using this infrastructure:

```tsx
//Whereever you are in the codebase, you can always easily grab your structure's namespace by calling it from the "__MODELS" alias (defined in the 'paths' property of tsconfig.json and converted to a webpack alias using the `tsconfig-paths-webpack-plugin`
import { USER, NETWORK } from "__MODELS";

//Get an instance of a user from mongo in the backend:
const expectedUser: any = await db.collection("users").findOne(/* some query */);

//(Optionally) validate that the user has all the right types/properties for this model
const validatedUsers: USER.Interface[] = USER.validate(expectedUser);

//Send the validated user to the frontend:
const responseObject: NETWORK.IUser = {
    message: "User succesfully extracted from query",
    success: true,
    payload: validatedUser
};
return res.send(responseObject);

//Receive the network package at the frontend and (optionally) re-validate its structures:
fetch(`/api/getuser?id=${userId}`).then(async res => {
    const networkUserPackage: NETWORK.IUser = await res.json();
    if (res.status >= 200 && res.status < 300) {
        return USER.validate(networkPackage.payload);
    } else {
        throw new Error();
    }
});

//Pass the user through as the payload of a redux action (with payload of type USER.Interface)
response => AppActions.fetchUserFulfilled(response))

//Recast that user as a 'mirror' immutable object within the redux reducer(s):
    switch (action.type) {
        case AppActions.Types.FETCH_USER_FULFILLED:
            //Cast action as corresponding type for this action
            const matchedAction: ReturnType<typeof AppActions.fetchUserFulfilled> = action as any;
            const validatedUser: USER.Interface = matchedAction;
            const immutableUser: USER.ImType = USER.ImGen(validatedUser);
            const newReduxSubstate: USERFEED.ImType = previousReduxSubstate.setIn(['allUsers',validatedUser._id],immutableUser);
            return newReduxSubstate;

    //Make all your (immutable) users extractable from your redux state and available to react containers via a selector function (notice the plural convention USER.ImTypes signifying that it mirrors the *array* of POJOs USER.Interface[])
    const getAllUsers = (state: ROOTSTATE.ImType): USER.ImTypes => {
    return state.getIn(['feed','allUsers']);
};

//Map your selector function to the props of your react container
interface IReduxStateToProps {
    allUsers: USER.ImTypes;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        allUsers: getAllUsers(state)
    };
}

//Call action callbacks in your container to update the redux state and/or send info to backend
{ users.map( (el,ind) => (<div key={ind} className="user-likes" onClick={( ) => this.props.cbLikeUser(users.getIn([ind,'_id']))}> <User userData={} />) ) };

//Etc.
```

Notice how many places in your codebase you are (re)-using the same basic structures, types, validators, etc. -- that's why it's been made easy to grab all of those resources associated with a structure by calling on a got namespace.

###### src/server

This has all the code for a fairly straightforward express-mongo backend. The functions within `server/backend` simply serve to decouple the express roots from the bulk of the app's business logic.

```
.
.
.
+-- _src
|   +-- _server
|       +-- index.ts
|       +-- _routes
|       +-- _backend
|           +-- _specs
|           +-- [various-business-logic-functions]
.
.
.
```

###### webapp

The `src/webapp` dir contains a fiarly straightforward react-redux-epicMiddleware setup. I personally like to have a separate dir for each component and container since this lets you also easily associate all sorts of local resources with your specific components such as css-module files, READMEs, testing files, and auxiliary functions and subcomponents that are nice to break out but unlikely to be used in any other component (and thus don't require/deserve their own dir).

```
.
.
.
+-- _src
|   +-- _webapp
|       +-- _AppEntry
|       +-- _Components
|       +-- _Containers
|       +-- _Redux
|           +-- _actions
|           +-- _epics
|           +-- _middleware
|           +-- _reducers
|           +-- _selectors
|           +-- _store
|       +-- _Utils
.
.
.
```

`src/webapp/AppEntry` houses your entry points and global style files. `AppRoutes` is where your app truly begins.

Everything to do with redux is grouped into `webapp/Redux`, and I've found it particulalry helpful to group all actions and action creators into a single namespace defined in `webapp/Redux/actions/index.ts`.

`Utils` contains any other miscellaneous contants/functions that are specific to the frontend. For example, all parameters related to frontend presentation (such as colors), are defined in the namespace `FrontendPresentation` in `Utils/frontendPresentation.ts`.

### Testing

Since this app is a boilerplate demo, not many testing specifics have been implemnted. However, the basic infrastructure for forntend and backend tests using mocha, enzyme and chai is in place and accesible through the commands `yarn test-frontend` and `yarn test-backend`.

### Tech Details

#### Transpiling ts/tsx -> js

There are a few ways to get ts/tsx down to 'rock-bottom' js usable in any browsers worth worrying about. After some experimentation, I ended up using the `ts-loader` in webpack to convert `ts/tsx` to `js/jsx`, and then babel to convert ES6 to the target of Babel's defaults in the 'env' preset (i.e. standard browser output).

This repo uses webpack to bundle both the front and backend into low-level JS (with source maps) in the `dist` dir. This dir can be cleaned out on a regular basis (as it tends to accumulate junk, especially in dev mode).

#### CSS/LESS/SCSS

If you want global styles applied to your bundle, add them to `src/webapp/AppEntry/global.*`. If you want local modules for CSS/LESS/SCSS modules, then look at the examples in `src/webapp/Components/Templates`. If you want `styled-jsx` then you can see examples of its application in `Templates` and throughout this app.
