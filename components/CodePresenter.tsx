import {Code as Props} from "core/ElementInfo";
import * as React from "react";
import Highlight from "react-highlight.js";

const CodePresenter = (props: Props) => {
    return (
        <div>
            <Highlight language={props.language}>
                {props.value}
            </Highlight>
        </div>
    );
};

export default CodePresenter;
