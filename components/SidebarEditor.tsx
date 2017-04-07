import RichTextEditor from "components/RichTextEditor";
import ImagePicker from "containers/ImagePicker";
import {RawDraftContentState} from "draft-js";
import * as React from "react";
import AutoUnfocusEditor from "./enhancers/AutoUnfocusEditor";

interface Value {
    title: string;
    content: RawDraftContentState;
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
                <ImagePicker currentImage={this.props.value.imgSource} onImageChanged={this.imgSourceChanged} />
            </div>
        );
    }

    private titleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, title: e.currentTarget.value});
    }

    private contentChanged = (state: RawDraftContentState) => {
        this.props.onValueChange({... this.props.value, content: state});

    }

    private imgSourceChanged = (src: string) => {
        this.props.onValueChange({... this.props.value, imgSource: src});

    }
}

export default AutoUnfocusEditor(SidebarEditor);
