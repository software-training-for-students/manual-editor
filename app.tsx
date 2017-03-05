import Manual from "Manual";
import Menu from "Menu";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import reducer from "reducers";
import * as Redux from "redux";
import * as ReduxDevTools from "redux-devtools-extension";
import ReduxThunkMiddleware from "redux-thunk";
import {Store} from "stores";
import "./styles.css";

const store = Redux.createStore<Store>(reducer,
 ReduxDevTools.composeWithDevTools(Redux.applyMiddleware(ReduxThunkMiddleware)));

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <div>
    <Menu />
    <Manual />
    </div>
</ReactRedux.Provider>,
document.getElementById("root"));
