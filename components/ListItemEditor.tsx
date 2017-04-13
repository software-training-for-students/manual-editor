import {Editor as RichTextEditor} from "components/RichText";
import {RawDraftContentState} from "draft-js";
import * as React from "react";

type Props = {
    value: RawDraftContentState;
    onValueChange: (value: RawDraftContentState) => void;
};

export default function(props: Props) {
    let {value, onValueChange, ...rest} = props;
    return (
        <li {...rest} >
            <p>
                <RichTextEditor value={value} onValueChange={onValueChange} />
            </p>
        </li>
    );
}
