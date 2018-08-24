# Typescript-MERiN Boilerplate

## Typescript-Mongo-Express-React-immutable-Node

### Project TODOs

-   Security: Implement better authorization with e.g. passport, web tokens, etc.
    -   Local storage: enable authorized user to remain authorized for ~24 hours
    -   Enable user-specific actions
-   Search: at the moment word search is only local -- needs to query actual DB
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

After cloning the entering the repo, fire up your editor and start installing the modules with e.g. `yarn install`.

First, we need to set our environment variables. So copy the contents of `.env-template` to a new `.env` file. The app will work locally as is, but you might want to customize the passwords, keys in your new `.env` file and, if you want image-uploading to work, you'll need to supply proper AWS credentials in the variables beginning with `AWS_`.

Next, open three shells of a unix terminal in the project's root directory (sorry -- I like to use bash scripts in my dev environment -- you'll have to adapt if you're using PCs). In the first terminal, get a `mongodb` server going. With e.g. `Mongo 3.4.4` installed locally, this can be done with the command:

```bash
mongod [--dbpath 'path/to/your/db/if/not/in/default/location']
```

In the second terminal, make sure you have `nodemon` installed globally (or add it locally if you prefer), then build and start running your express server using `nodemon` with:

```bash
sh _devServer.sh
```

In the third terminal, start up the webpack-dev server for the frontend with:

```bash
sh _devWebapp.sh
```

If all goes well, the app will function from `http://localhost:3000/`, and both the forntend and backend will auto-reload whenever you make changes to their code.

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

A lot of thought has gone into building this architecture so that you can share as much code between the frontend and backend as possible, have one source of truth for (virtually) everything you do, readily convert between immutable and POJO represetntations of your apps data structures, and enjoy a productive development experience (with strong types throughout, hot-reloading, etc.).

#### Longer more useful version

Most codebases can be split into roughly three parts: `source code`, `configuration`, and `testing`.

##### source code

All of the project's source code can be found in `src`. It has three directories: `server`, `webapp` and `common`.

###### src/common

As the name suggests, `common` is designed to house functions/structures/types/etc used by either the frontend or the backend in a bid to have a single source of truth for everything in this codebase.

Of particular importance to this approach are the data-structure models created in `src/common/models`. The idea is that when you come to implement a complex application, you'll want to be able to think in terms of the exact same data structures on both the frontend and backend, and readily be able to access any function/type/creator for that structure. I.e. we want a single source of truth for our full-stack application's key data structures, and those are found within individual namespaces within the `src/common/models` dir.

For example, if you want to represent a user (with properties like 'firstName', 'lastName' 'email', etc.), then you can store such an object in e.g. a noSQL database, and when it's requsted from the frontend, you first extract it from the db, validate it's properties using an associated `validate()` function, send it across a network as a JSON object, then, using _the same_ validate() function, types, etc. for that structure on the frontend, add it to your redux state and, throughout your components, reducers, selectors, epics, etc., you can confidently locate your types, generators, etc. for your structures.

Also key to this architecture is the ability to create 'mirror' immutable objects using an immutable generator from within the same namespace. Here is a rough, highly-simplified schematic of the life of a 'user' in its journey from the db to the frontend and back again using this infrastructure:

```tsx
import { USER, NETWORK } from "__MODELS"; //Whereever you are in the codebase, you can always easily grab your structure's namespace by calling it from the "__MODELS" alias defined in tsconfig.json

//Get an instance of a user from mongo in the backend:
const expectedUser: any = await db.collection("users").findOne(/* some query */);

//Optionally validate the user has all the right types/properties for this model
const validatedUser: USER.Interface = USER.validate(expectedUser);

//Send it to the frontend:
const responseObject: NETWORK.IUser = {
    message: "User succesfully extracted from query",
    success: true,
    payload: validatedUser
};
return res.send(responseObject);

//Receive the network package at the frontend and (optionally) re-validate it's structures:
fetch(`/api/getuser?id=${userId}`).then(async res => {
    const networkUserPackage: NETWORK.IUser = await res.json();
    if (res.status >= 200 && res.status < 300) {
        return USER.validate(networkPackage.payload);
    } else {
        throw new Error();
    }
});

//Pass the user through as the payload of a redux action (with payload of type USER.Interface)
(response: any) => AppActions.fetchUserFulfilled(response))

//Recast that user as a 'mirror' immutable object within the redux reducer(s):
    switch (action.type) {
        case AppActions.Types.FETCH_USER_FULFILLED:
            //Cast action as corresponding type
            const matchedAction: ReturnType<typeof AppActions.fetchUserFulfilled> = action as any;
            const validatedUser: USER.Interface = matchedAction;
            const immutableUser: USER.ImType = USER.ImGen(validatedUser);
            const newReduxSubstate: USERFEED.ImType = previousReduxSubstate.setIn(['allUsers',validatedUser._id],immutableUser);
            return newReduxSubstate;

    //Make all your (immutable) users extractable from your redux state and available to react containers via a selector function (notice the plural convention USER.ImTypes signifying that it mirrors the array of POJOs USER.Interface[])
    const getUsers = (state: ROOTSTATE.ImType): USER.ImTypes => {
    return state.getIn(['feed','allUsers']);
};

//Map your selector function to the props of your react container
interface IReduxStateToProps {
    allUsers: USER.ImTypes;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        allUsers: getUsers(state)
    };
}

//Call action callbacks in your container to update redux state and/or send info to backend
{ users.map( (el,ind) => (<div key={ind} className="user-likes" onClick={( ) => this.props.cbLikeUser(users.getIn([ind,'_id']))}> <User userData={} />) ) };

//Etc.
```

### Testing

Since this app is a boilerplate demo, not many testing specifics have been implemnted. However, the basic infrastructure for forntend and backend tests using mocha, enzyme and chai is in place and accesible through the commands `yarn test-frontend` and `yarn test-backend`.

### Tech Details

#### Transpiling ts/tsx -> js

There are a few ways to get ts/tsx down to 'rock-bottom' js usable in any browsers worth worrying about. After some experimentation, I ended up using the `ts-loader` in webpack to convert `ts/tsx` to `js/jsx`, and then babel to convert ES6 to the target of Babel's defaults in the 'env' preset (i.e. standard browser output).

This repo uses webpack to bundle both the front and backend into low-level JS (with source maps) in the `dist` dir. This dir can be cleaned out on a regular basis (as it tends to accumulate junk, especially in dev mode).

#### CSS/LESS/SCSS

If you want global styles applied to your bundle, add them to `src/webapp/AppEntry/global.*`. If you want local modules for CSS/LESS/SCSS modules, then look at the examples in `src/webapp/Components/Templates`. If you want `styled-jsx` then you can see examples of its application in `Templates` and throughout this app.
