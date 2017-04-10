import createElement from "core/createElement";
import * as React from "react";
import {ItemTree} from "stores/Document";

interface Props {
    itemId: number;
    items: ItemTree[];
}

export default function Table(props: Props) {
    return (
        <table>
            <tbody>
            {
                props.items.map(createElement)
            }
            </tbody>
        </table>
    );
}
