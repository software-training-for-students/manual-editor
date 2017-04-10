import createElement from "core/createElement";
import * as React from "react";
import {ItemTree} from "stores/Document";

interface Props {
    itemId: number;
    items: ItemTree[];
}

export function UnorderedList(props: Props) {
    return (
        <ul>
            {
                props.items.map(createElement)
            }
        </ul>
    );
}

export function OrderedList(props: Props) {
    return (
        <ol>
            {
                props.items.map(createElement)
            }
        </ol>
    );
}

export function InstructionList(props: Props) {
    return (
        <ol className="instruction-list">
            {
                props.items.map(createElement)
            }
        </ol>
    );
}
