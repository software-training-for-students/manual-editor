import AboutPage from "components/AboutPage";
import CoverPage from "components/CoverPage";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import reducer from "reducers";
import * as Redux from "redux";
import * as ReduxDevTools from "redux-devtools-extension";
import ReduxThunkMiddleware from "redux-thunk";
import {Store} from "stores";
import Manual from "./Manual";
import Menu from "./Menu";
import "./styles.css";

declare const DEBUG: boolean;

let enhancer: Redux.StoreEnhancer<Store>;

if (DEBUG) {
    enhancer = ReduxDevTools.composeWithDevTools(Redux.applyMiddleware(ReduxThunkMiddleware));
} else {
    enhancer = Redux.applyMiddleware(ReduxThunkMiddleware);
}

const store = Redux.createStore<Store>(reducer, enhancer);

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <div>
    <Menu />
    <Manual>
        <CoverPage date={new Date()} />
        <AboutPage />
    </Manual>
    </div>
</ReactRedux.Provider>,
document.getElementById("root"));
