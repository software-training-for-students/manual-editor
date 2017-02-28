import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import * as ReduxDevTools from "redux-devtools-extension";
import {Store} from "stores";
import DocumentReducers from "reducers/DocumentReducers";
import MenuReducers from "reducers/MenuReducers";
import FlyoutReducers from "reducers/FlyoutReducers";
import Manual from "Manual";
import Menu from "Menu";
import "./styles.css";

const store = Redux.createStore<Store>(Redux.combineReducers<Store>({
    document : DocumentReducers,
    menu : MenuReducers,
    flyout : FlyoutReducers
}), ReduxDevTools.devToolsEnhancer<Store>({}));

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <div>
    <Menu />
    <Manual />
    </div>
</ReactRedux.Provider>,
document.getElementById("root"));