import MenuItem from "containers/MenuItem";
import {convertToRaw, EditorState} from "draft-js";
import * as React from "react";

const defaultListItemValue = convertToRaw(EditorState.createEmpty().getCurrentContent());

export let UnorderedListButton = () => {
    return <MenuItem
        insertEnabled
        menuItemText="Unordered List"
        menuItemHeading="Create Unordered List"
        menuItemId="unordered-list"
        items={[
            {
                elementType: "UnorderedList",
                metaItemType: "open",
            },
            {
                elementState: {
                    value: defaultListItemValue,
                },
                elementType: "ListItem",
            },
            {
                elementType: "UnorderedList",
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
                metaItemType: "open",
            },
            {
                elementState: {
                    value: defaultListItemValue,
                },
                elementType: "ListItem",
            },
            {
                elementType: "OrderedList",
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
                metaItemType: "open",
            },
            {
                elementState: {
                    value: defaultListItemValue,
                },
                elementType: "ListItem",
            },
            {
                elementType: "InstructionList",
                metaItemType: "close",
            },
        ]}
        itemToEdit={1}
    />;
};
