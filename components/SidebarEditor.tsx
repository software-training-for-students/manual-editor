import AutoUnfocusEditor from "AutoUnfocusEditor";
import RichTextEditor from "components/RichTextEditor";
import {EditorState} from "draft-js";
import * as React from "react";

interface Value {
    title: string;
    content: EditorState;
    imgSource: string;
}

interface Props {
    value: Value;
    onValueChange: (value: Value) => void;
    onComplete: () => void;
}

// tslint:disable-next-line:no-empty
function noop() {}

class SidebarEditor extends React.Component<Props, void> {
    public render() {
        return(
            <div className="sidebar-note">
                <input type="text" value={this.props.value.title} placeholder="Sidebar Title" onChange={this.titleChanged} />
                <RichTextEditor value={this.props.value.content} onComplete={noop} onValueChange={this.contentChanged} />
                <input type="text" value={this.props.value.imgSource} placeholder="Image Path" onChange={this.imgSourceChanged} />
            </div>
        );
    }

    private titleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, title: e.currentTarget.value});
    }

    private contentChanged = (state: EditorState) => {
        this.props.onValueChange({... this.props.value, content: state});
    }

    private imgSourceChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, imgSource: e.currentTarget.value});
    }
}

export default AutoUnfocusEditor(SidebarEditor);
