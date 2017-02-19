import * as React from "react";

type EditorProps = React.HTMLAttributes<HTMLInputElement> & {
    value : string;
    onComplete: () => void;
    onValueChange : (value : string) => void;
};

const minInputSize = 20;
const extraInputSpace = 2; // Extra whitespace at the end to account for any buttons in the text box.

const SingleLineEditor : React.StatelessComponent<EditorProps> = (props : EditorProps) => {
    const textLength = props.value.length;
    var {onComplete, onChange, onValueChange, ...rest} = props;
    return <input type="text" size={Math.max(minInputSize, textLength) + extraInputSpace}
     onBlur={onComplete} onChange={(event) => {
         onValueChange(event.target.value);
         if(onChange !== undefined) {
             onChange(event);
         }
     }}
     {...rest} />
}

export default SingleLineEditor;