import MenuItem from "containers/MenuItem";
import {convertToRaw, EditorState} from "draft-js";
import * as React from "react";

export let UnorderedListButton = () => {
    return <MenuItem
        insertEnabled
        menuItemText="Unordered List"
        menuItemHeading="Create Unordered List"
        menuItemId="unordered-list"
        items={[
            {
                elementType: "UnorderedList",
                elementState: {},
                metaItemType: "open",
            },
            {
                elementType: "ListItem",
                elementState: {
                    value: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                },
            },
            {
                elementType: "UnorderedList",
                elementState: {},
                metaItemType: "close",
            },
        ]}
        itemToEdit={1}
    />;
};
export let OrderedListButton = () => {
    return <MenuItem
        insertEnabled
        menuItemText="Ordered List"
        menuItemHeading="Create Ordered List"
        menuItemId="ordered-list"
        items={[
            {
                elementType: "OrderedList",
                elementState: {},
                metaItemType: "open",
            },
            {
                elementType: "ListItem",
                elementState: {
                    value: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                },
            },
            {
                elementType: "OrderedList",
                elementState: {},
                metaItemType: "close",
            },
        ]}
        itemToEdit={1}
    />;
};

export let InstructionListButton = () => {
    return <MenuItem
        insertEnabled
        menuItemText="Instruction List"
        menuItemHeading="Create Instruction List"
        menuItemId="instruction-list"
        items={[
            {
                elementType: "InstructionList",
                elementState: {},
                metaItemType: "open",
            },
            {
                elementType: "ListItem",
                elementState: {
                    value: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                },
            },
            {
                elementType: "InstructionList",
                elementState: {},
                metaItemType: "close",
            },
        ]}
        itemToEdit={1}
    />;
};
