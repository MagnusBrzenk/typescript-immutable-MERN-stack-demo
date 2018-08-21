import { logger } from "__REDUX/middleware";
import { rootEpic } from "__REDUX/epics";
import { epicDependencies } from "__REDUX/epics/epicDependencies";
import { rootReducer } from "__REDUX/reducers";
import { History } from "history";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

//† Following pattern from here: https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html
const epicMiddleware = createEpicMiddleware({ dependencies: epicDependencies });

//
export function createAndConfigureStore(history: History, initialState?: any): Store<any> {
    //

    //Inherited
    let middleware = applyMiddleware(logger, epicMiddleware, routerMiddleware(history));
    if (process.env.NODE_ENV !== "production") middleware = composeWithDevTools(middleware);

    //Inherited
    const store: Store<any> = createStore(rootReducer as any, initialState, middleware);

    //From †
    epicMiddleware.run(rootEpic as any);

    //Inherited
    if (!!module.hot) {
        module.hot.accept("../reducers", () => {
            const nextReducer = require("../reducers");
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
