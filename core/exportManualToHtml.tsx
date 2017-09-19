import {getBranding} from "core/branding";
import reduxStore from "core/reduxStore";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import {Provider} from "react-redux";
import Manual from "../Manual";

export default function exportManualToHtml() {
    return ReactDOMServer.renderToStaticMarkup(
        <Provider store={reduxStore}>
            <Manual>
                {getBranding()}
            </Manual>
        </Provider>,
    );
}
