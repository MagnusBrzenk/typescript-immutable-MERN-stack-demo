import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { createBrowserHistory } from "history";
import { createAndConfigureStore } from "__REDUX/store";
import { AppRoutes } from "./AppRoutes";

// Import Global CSS Styles
import "./global.css";
import "./global.less";
import "./global.scss";

// Prepare store
const history = createBrowserHistory();
const store = createAndConfigureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppRoutes />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);
