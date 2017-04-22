import MenuItem from "containers/MenuItem";
import * as React from "react";

const ToolboxButton = () => {
    return (
        <MenuItem
            menuItemId="toolbox"
            menuItemText="Toolbox"
            menuItemHeading="Create Toolbox"
            items={[
                {
                    elementType: "Toolbox",
                    elementState: {
                        value: [
                            {
                                description: "Tool description",
                                imgSrc: "",
                                name: "Tool Name",
                            },
                        ],
                    },
                },
            ]}
            insertEnabled
        />
    );
};

export default ToolboxButton;
