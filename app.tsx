import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import {Document, initialState} from "./DocumentStore";
import CoverPage from "./components/CoverPage";
import AboutPage from "./components/AboutPage";
import BaseReducers from "./reducers/BaseReducers";

import * as EditableImages from "./components/EditableImage";

const store = Redux.createStore<Document>(BaseReducers);

ReactDOM.render(
<ReactRedux.Provider store={store}>
    <div>
        <CoverPage date={new Date()} />
        <AboutPage />
        <EditableImages.default.EditableSingleImage itemId={3} />
    </div>
</ReactRedux.Provider>,
document.getElementById("root"));