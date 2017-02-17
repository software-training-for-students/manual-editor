import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import {Document, initialState} from "./DocumentStore";
import CoverPage from "./CoverPage";
import AboutPage from "./AboutPage";
import EditReducers from "./EditReducers";

const store = Redux.createStore<Document>(EditReducers, initialState);

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <div>
        <CoverPage date={new Date()} />
        <AboutPage />
    </div>
</ReactRedux.Provider>,
document.getElementById("root"));