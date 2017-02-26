import * as React from "react";
import {SingleImageProps, SingleImageCssClass, SideBySideImageProps} from "components/Images";
import AutoUnfocusEditor from "AutoUnfocusEditor";

interface ImageEditorProps<TImageProps> {
    value : TImageProps | undefined
    onValueChange? : (newProps: TImageProps) => void;
    onComplete : () => void
}

class SingleImageEditor extends React.Component<ImageEditorProps<SingleImageProps>, void> {

    private onSourceChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(this.props.onValueChange)
            this.props.onValueChange({... this.props.value, source : event.target.value});
    }
    
    private onBorderChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(this.props.onValueChange)
            this.props.onValueChange({... this.props.value, border : event.target.checked});
    }

    private onCaptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(this.props.onValueChange)
            this.props.onValueChange({... this.props.value, caption : event.target.value});
    }

    private onCssClassChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(this.props.onValueChange)
            this.props.onValueChange({... this.props.value, className : event.target.value as SingleImageCssClass});
    }

    private static readonly defaultImageProps : SingleImageProps = {
        caption : "",
        border : false,
        source : "",
        className : "full-width-image"
    };

    public render() {
        const imageProps = this.props.value || SingleImageEditor.defaultImageProps;
        return (
            <div className="image-editor">
                <section>
                    <label>Image Source</label>
                    <input type = "url" onChange={this.onSourceChanged} value={imageProps.source} size={80} />
                </section>
                <section>
                    <input type="checkbox" onChange={this.onBorderChanged} checked={imageProps.border} />
                    <label>Has Border?</label>
                </section>
                <section>
                    <label>Caption</label>
                    <input type = "text" onChange={this.onCaptionChanged} value={imageProps.caption} />
                </section>
                <section>
                    <label>Image Style</label>
                    <select value={imageProps.className} onChange={this.onCssClassChanged}>
                        <option value="full-width-image" >Full Width</option>
                        <option value="centered-image-tiny" >Tiny, Centered</option>
                        <option value="centered-image-small" >Small, Centered</option>
                        <option value="centered-image-medium" >Medium, Centered</option>
                        <option value="centered-image-large" >Large, Centered</option>
                        <option value="side-image-small" >Small, Aside</option>
                        <option value="side-image-medium" >Medium, Aside</option>
                        <option value="side-image-large" >Large, Aside</option>
                        <option value="sidebar-icon" >Sidebar Icon</option>
                    </select>
                </section>
            </div>
        );
    }
}

export default {
    SingleImageEditor : AutoUnfocusEditor(SingleImageEditor)
}