import * as React from "react";
import Highlight from "react-highlight.js";

interface Props {
    language: string;
    value: string;
    onClick: () => void;
}

const CodePresenter = (props: Props) => {
    return (
        <div onClick={props.onClick}>
            <Highlight language={props.language}>
                {props.value}
            </Highlight>
        </div>
    );
};

export default CodePresenter;
