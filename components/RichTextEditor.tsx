import * as React from "react";
import * as DraftJs from "draft-js";
import "es6-shim";
import AutoUnfocusEditor from "AutoUnfocusEditor";

interface Props {
    value : DraftJs.EditorState;
    onValueChange : (value : DraftJs.EditorState) => void;
    onComplete : () => void;
}

class RichTextEditor extends React.Component<Props, void> {
    public render() {
        return <DraftJs.Editor editorState={this.props.value}
                    onChange={this.onChange}
                    placeholder={"Type your content below."} />
    }

    private onChange = (value : DraftJs.EditorState) => {
        this.props.onValueChange(value);
    }
}

export default AutoUnfocusEditor(RichTextEditor);