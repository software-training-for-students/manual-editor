import AutoUnfocusEditor from "AutoUnfocusEditor";
import * as Draft from "draft-js";
import "draft-js/dist/Draft.css";
import "es6-shim";
import * as React from "react";

interface Props {
    value: Draft.EditorState;
    onValueChange: (value: Draft.EditorState) => void;
    onComplete: () => void;
}

class RichTextEditor extends React.Component<Props, void> {
    public render() {
        return (
            <div className="editor">
                <Draft.Editor
                    editorState={this.props.value}
                    onChange={this.onChange}
                    placeholder={"Type your content here."}
                    handleKeyCommand={this.handleKeyCommand}
                />
            </div>
        );
    }

    private onChange = (value: Draft.EditorState) => {
        this.props.onValueChange(value);
    }

    private handleKeyCommand: (command: string) => "handled" | "not-handled" = (command: string) => {
        let state = Draft.RichUtils.handleKeyCommand(this.props.value, command);
        if (state) {
            this.onChange(state);
            return "handled";
        }
        return "not-handled";
    }
}

export default AutoUnfocusEditor(RichTextEditor);
