import MenuItem from "containers/MenuItem";
import * as React from "react";

const HtmlButton = () => {

    return <MenuItem
        insertEnabled
        menuItemText="Raw HTML"
        menuItemHeading="Create Raw HTML Block"
        menuItemId="raw-html"
        defaultValue={{value: ""}}
        elementType="RawHtml"
    />;
};

export default HtmlButton;
