import MenuItem from "containers/MenuItem";
import * as React from "react";

export default function ToolboxButton() {
    return (
        <MenuItem
            menuItemId="toolbox"
            menuItemText="Toolbox"
            menuItemHeading="Create Toolbox"
            items={[
                {
                    elementState: {
                        value: [
                            {
                                description: "Tool description",
                                imgSrc: "",
                                name: "Tool Name",
                            },
                        ],
                    },
                    elementType: "Toolbox",
                },
            ]}
            insertEnabled
        />
    );
};
