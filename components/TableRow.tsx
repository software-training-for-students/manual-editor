import createElement from "core/createElement";
import * as React from "react";
import {ItemTree} from "stores/Document";

interface Props {
    itemId: number;
    items: ItemTree[];
}

export default function TableRow(props: Props) {
    return (
        <tr>
            {
                props.items.map(createElement)
            }
        </tr>
    );
}
