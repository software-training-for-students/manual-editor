import createElement from "core/createElement";
import * as React from "react";
import {ItemTree} from "stores/Document";

interface Props {
    itemId: number;
    items: ItemTree[];
}

export default function TableHeader(props: Props) {
    return (
        <th>
            {
                props.items.map(createElement)
            }
        </th>
    );
}
