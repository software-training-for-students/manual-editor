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
                componentTypeName: "UnorderedList",
                defaultProps: {},
                metaItemType: "open",
            },
            {
                componentTypeName: "ListItem",
                defaultProps: {
                    value: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                },
            },
            {
                componentTypeName: "UnorderedList",
                defaultProps: {},
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
                componentTypeName: "OrderedList",
                defaultProps: {},
                metaItemType: "open",
            },
            {
                componentTypeName: "ListItem",
                defaultProps: {
                    value: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                },
            },
            {
                componentTypeName: "OrderedList",
                defaultProps: {},
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
                componentTypeName: "InstructionList",
                defaultProps: {},
                metaItemType: "open",
            },
            {
                componentTypeName: "ListItem",
                defaultProps: {
                    value: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                },
            },
            {
                componentTypeName: "InstructionList",
                defaultProps: {},
                metaItemType: "close",
            },
        ]}
        itemToEdit={1}
    />;
};
