import SingleLineEditor from "components/SingleLineEditor";
import * as React from "react";

type Props = {
    value: string;
    onValueChange: (value: string) => void;
};

export default function(props: Props) {
    return (
        <li {...props}>
            <SingleLineEditor value={props.value} onValueChange={props.onValueChange} />
        </li>
    );
}
