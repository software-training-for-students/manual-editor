import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import {Document} from "./DocumentStore";
import BaseReducers from "./reducers/BaseReducers";
import Manual from "./Manual";

const store = Redux.createStore<Document>(BaseReducers);

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <Manual />
</ReactRedux.Provider>,
document.getElementById("root"));