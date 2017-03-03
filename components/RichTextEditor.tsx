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
        return (
            <div className="editor">
                <DraftJs.Editor editorState={this.props.value}
                        onChange={this.onChange}
                        placeholder={"Type your content below."}
                        handleKeyCommand={this.handleKeyCommand} />
            </div>
        );
    }

    private onChange = (value : DraftJs.EditorState) => {
        this.props.onValueChange(value);
    }

    private handleKeyCommand : (command : string) => "handled" | "not-handled" = (command : string) => {
        var state = DraftJs.RichUtils.handleKeyCommand(this.props.value, command);
        if(state) {
            this.onChange(state);
            return "handled";
        }
        return "not-handled";
    }
}

export default AutoUnfocusEditor(RichTextEditor);