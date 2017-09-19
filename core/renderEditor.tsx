import * as Branding from "core/branding";
import reduxStore from "core/reduxStore";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from "react-redux";
import Manual from "../Manual";
import Menu from "../Menu";
import "./styles.css";

export default function renderEditorInto(element: HTMLElement | null) {
    ReactDOM.render(
        <ReactRedux.Provider store={reduxStore}>
            <div>
            <Menu />
            <Manual>
                {Branding.getBranding()}
            </Manual>
            </div>
        </ReactRedux.Provider>,
        element);
}
