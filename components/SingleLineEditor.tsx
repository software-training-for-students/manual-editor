import * as React from "react";

type EditorProps = React.HTMLAttributes<HTMLInputElement> & {
    value : string;
};

const minInputSize = 20;
const extraInputSpace = 2; // Extra whitespace at the end to account for any buttons in the text box.

const SingleLineEditor : React.StatelessComponent<EditorProps> = (props : EditorProps) => {
    const textLength = props.value.length;
    return <input type="text" size={Math.max(minInputSize, textLength) + extraInputSpace} {...props} />
}

export default SingleLineEditor;