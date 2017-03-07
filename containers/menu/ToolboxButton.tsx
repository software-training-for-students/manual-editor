import MenuItem from "containers/MenuItem";
import * as React from "react";

const ToolboxButton = () => {
    return (
        <MenuItem
            defaultValue={{
                value: [
                    {
                        description: "Tool description",
                        imgSrc: "",
                        name: "Tool Name",
                    },
                ],
            }}
            menuItemId="toolbox"
            menuItemText="Toolbox"
            menuItemHeading="Create Toolbox"
            elementType="Toolbox"
            insertEnabled
        />
    );
};

export default ToolboxButton;
