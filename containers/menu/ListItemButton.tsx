import MenuItem from "containers/MenuItem";
import * as React from "react";

const ListItemButton = () => {
    return <MenuItem
        insertEnabled
        menuItemText="List Item"
        menuItemHeading="Create List Item"
        menuItemId="list-item"
        items={[
            {
                componentTypeName: "ListItem",
                defaultProps: {
                    value: "",
                },
            },
        ]}
    />;
};

export default ListItemButton;
