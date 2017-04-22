import MenuItem from "containers/MenuItem";
import * as React from "react";

const HtmlButton = () => {

    return <MenuItem
        insertEnabled
        menuItemText="Raw HTML"
        menuItemHeading="Create Raw HTML Block"
        menuItemId="raw-html"
        items={[
            {
                elementType: "RawHtml",
                elementState: {
                    value: "",
                },
            },
        ]}
    />;
};

export default HtmlButton;
