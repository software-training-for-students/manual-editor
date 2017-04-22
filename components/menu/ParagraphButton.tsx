import MenuItem from "containers/MenuItem";
import {convertToRaw, EditorState} from "draft-js";
import * as React from "react";

export default function ParagraphButton() {

    return <MenuItem
        insertEnabled
        menuItemText="Paragraph"
        menuItemHeading="Create Paragraph"
        menuItemId="paragraph"
        items={[
            {
                elementState: {
                    value: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                },
                elementType: "RichText",
            },
        ]}
    />;
};
