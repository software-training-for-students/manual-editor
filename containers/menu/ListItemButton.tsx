import MenuItem from "containers/MenuItem";
import {convertToRaw, EditorState} from "draft-js";
import * as React from "react";

const ListItemButton = () => {
    return <MenuItem
        insertEnabled
        menuItemText="List Item"
        menuItemHeading="Create List Item"
        menuItemId="list-item"
        items={[
            {
                elementState: {
                    value: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                },
                elementType: "ListItem",
            },
        ]}
    />;
};

export default ListItemButton;
