import createElement from "core/createElement";
import {ItemTree} from "core/ItemTree";
import * as React from "react";

interface Props {
    itemId: number;
    items: ItemTree[];
}

// There needs to be special support for nesting instruction lists
// to make the counters work correctly.
export default function InstructionList(props: Props) {
    let children: JSX.Element[] = [];
    for (let i = 0; i < props.items.length; ++i) {
        let childItem = props.items[i];
        if (childItem.elementType === "ListItem") {
            // Include all elements until the next list item within the same li tag.
            let itemChildren: JSX.Element[] = [];
            let j = i + 1;
            for (; j < props.items.length && props.items[j].elementType !== "ListItem"; ++j) {
                itemChildren.push(<div key={props.items[j].itemId}>{createElement(props.items[j])}</div>);
            }
            // Insert the list item value before the elements captured above. A list item only has Rich Text
            // so we can treat the element as Rich Text while editing.
            children.push(
                <li key={props.items[i].itemId}>
                    {createElement({... props.items[i], elementType: "RichText"})}
                    {itemChildren}
                </li>,
            );
            // Skip over the items we've covered.
            i = j - 1;
        } else { // Include any elements in an instruction list before the first list item.
            children.push(createElement(props.items[i]));
        }
    }
    return (
        <ol className="instruction-list">
            {children}
        </ol>
    );
}
