import Manual from "Manual";
import Menu from "Menu";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import DocumentReducers from "reducers/DocumentReducers";
import FlyoutReducers from "reducers/FlyoutReducers";
import MenuReducers from "reducers/MenuReducers";
import * as Redux from "redux";
import * as ReduxDevTools from "redux-devtools-extension";
import {Store} from "stores";
import "./styles.css";

const store = Redux.createStore<Store>(Redux.combineReducers<Store>({
    document : DocumentReducers,
    flyout : FlyoutReducers,
    menu : MenuReducers,
}), ReduxDevTools.devToolsEnhancer<Store>({}));

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <div>
    <Menu />
    <Manual />
    </div>
</ReactRedux.Provider>,
document.getElementById("root"));
