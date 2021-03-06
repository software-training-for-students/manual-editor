import {Editor as RichTextEditor} from "components/RichText";
import ImagePicker from "containers/ImagePicker";
import {SidebarNote as SidebarInfo} from "core/ElementInfo";
import {RawDraftContentState} from "draft-js";
import * as React from "react";

type Props = SidebarInfo & {
    onValueChange: (value: SidebarInfo["value"]) => void;
};

class SidebarEditor extends React.PureComponent<Props, {}> {
    public render() {
        return(
            <div className="sidebar-note">
                <input type="text" value={this.props.value.title} placeholder="Sidebar Title" onChange={this.titleChanged} />
                <RichTextEditor value={this.props.value.content} onValueChange={this.contentChanged} />
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

export default SidebarEditor;
