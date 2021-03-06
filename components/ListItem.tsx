import {Presenter as RichTextPresenter} from "components/RichText";
import {RichText as Props} from "core/ElementInfo";
import * as React from "react";

export default function ListItem(props: Props) {
    return (
        <li>
            <RichTextPresenter {... props} />
        </li>
    );
}
