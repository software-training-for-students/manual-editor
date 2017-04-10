import createElement from "core/createElement";
import * as React from "react";
import {ItemTree} from "stores/Document";

interface Props {
    itemId: number;
    items: ItemTree[];
}

export default function TableCell(props: Props) {
    return (
        <td>
            {
                props.items.map(createElement)
            }
        </td>
    );
}