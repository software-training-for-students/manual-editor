import {Editor as RichTextEditor} from "components/RichText";
import {RichText as ListItemProps} from "core/ElementInfo";
import * as React from "react";

type Props = ListItemProps & {
    onValueChange: (value: ListItemProps["value"]) => void;
};

export default function ListItemEditor(props: Props) {
    let {value, onValueChange, ...rest} = props;
    return (
        <li {...rest} >
            <RichTextEditor value={value} onValueChange={onValueChange} />
        </li>
    );
}
