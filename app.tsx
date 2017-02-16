import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import {Document} from "./DocumentStore";
import CoverPage from "./CoverPage";
import AboutPage from "./AboutPage";
import EditReducers from "./EditReducers";

const store = Redux.createStore<Document>(EditReducers, {});

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <div>
        <CoverPage title={"Empty Manual Template"}
        subtitle={"Small Tagline Description Here"} date={new Date()} />
        <AboutPage />
    </div>
</ReactRedux.Provider>,
document.getElementById("root"));