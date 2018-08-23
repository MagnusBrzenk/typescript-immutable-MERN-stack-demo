import * as React from "react";
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router";

import { HomePage } from "__CONTAINERS/HomePage";
import { NoMatchPage } from "__COMPONENTS/NoMatchPage";
import { EntryPage } from "__CONTAINERS/EntryPage";
import { RxjsPlayground } from "__COMPONENTS/RxjsPlayground";
import { Templates } from "__COMPONENTS/Templates";
import { Testing } from "__COMPONENTS/Testing";

export const AppRoutes = hot(module)(() => (
    <div className="routes-container" style={{ height: `100%`, width: `100%` }}>
        <Switch>
            <Route exact path="/" component={EntryPage} />
            {/* <Route exact path="/" component={HomePage} /> */}
            <Route exact path="/testing" component={Testing} />
            <Route exact path="/templates" component={Templates} />
            <Route exact path="/rxjs" component={RxjsPlayground} />
            <Route exact path="*" component={NoMatchPage} />
        </Switch>
    </div>
));
