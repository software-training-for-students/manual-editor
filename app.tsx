import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import {Store} from "./stores";
import BaseReducers from "./reducers/BaseReducers";
import FlyoutReducers from "./reducers/FlyoutReducers";
import Manual from "./Manual";
import Menu from "./Menu";

const store = Redux.createStore<Store>(Redux.combineReducers<Store>({
    document : BaseReducers,
    menu : (state : any) => {return state || {};},
    flyout : FlyoutReducers
}));

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <div>
    <Menu />
    <Manual />
    </div>
</ReactRedux.Provider>,
document.getElementById("root"));