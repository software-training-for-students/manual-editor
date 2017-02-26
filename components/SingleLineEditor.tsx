import * as React from "react";
import AutoUnfocusEditor from "AutoUnfocusEditor";

type EditorProps = React.HTMLAttributes<HTMLInputElement> & {
    value : string;
    onComplete: () => void;
    onValueChange : (value : string) => void;
};

const minInputSize = 20;
const extraInputSpace = 2; // Extra whitespace at the end to account for any buttons in the text box.

class SingleLineEditor extends React.Component<EditorProps, void> {
    public render() {
        const textLength = this.props.value.length;
        var {onComplete, onChange, onValueChange, ...rest} = this.props;
        return <input type="text" size={Math.max(minInputSize, textLength) + extraInputSpace}
        onChange={(event) => {
            onValueChange(event.target.value);
            if(onChange !== undefined) {
                onChange(event);
            }
        }}
        {...rest} />
    }
}

export default AutoUnfocusEditor(SingleLineEditor);