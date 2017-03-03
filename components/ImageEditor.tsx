import AutoUnfocusEditor from "AutoUnfocusEditor";
import {SideBySideImageCssClass, SideBySideImageProps, SingleImageCssClass, SingleImageProps} from "components/Images";
import * as React from "react";

interface ImageEditorProps<TImageProps> {
    value: TImageProps | undefined;
    onValueChange: (newProps: TImageProps) => void;
    onComplete: () => void;
}

class SingleImageEditor extends React.Component<ImageEditorProps<SingleImageProps>, void> {
    private static readonly defaultImageProps: SingleImageProps = {
        border : false,
        caption : "",
        className : "full-width-image",
        source : "",
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

    private onSourceChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, source : event.target.value});
    }

    private onBorderChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, border : event.target.checked});
    }

    private onCaptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, caption : event.target.value});
    }

    private onCssClassChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onValueChange({... this.props.value, className : event.target.value as SingleImageCssClass});
    }

}

// tslint:disable-next-line:max-classes-per-file
class SideBySideImageEditor extends React.Component<ImageEditorProps<SideBySideImageProps>, void> {
    private static readonly defaultImageProps: SideBySideImageProps = {
        border : false,
        caption : "",
        className : "sidebyside-image-large",
        leftSource : "",
        rightSource : "",
    };

    public render() {
        const imageProps = this.props.value || SideBySideImageEditor.defaultImageProps;
        return (
            <div className="image-editor">
                <section>
                    <label>Left Image Source</label>
                    <input type = "url" onChange={this.onLeftSourceChanged} value={imageProps.leftSource} size={80} />
                </section>
                <section>
                    <label>Right Image Source</label>
                    <input type = "url" onChange={this.onRightSourceChanged} value={imageProps.rightSource} size={80} />
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
                    <label>Image Size</label>
                    <select value={imageProps.className} onChange={this.onCssClassChanged}>
                        <option value="sidebyside-image-large">Large</option>
                        <option value="sidebyside-image-small">Small</option>
                    </select>
                </section>
            </div>
        );
    }

    private onLeftSourceChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, leftSource : event.target.value});
    }

    private onRightSourceChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, rightSource : event.target.value});
    }

    private onBorderChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, border : event.target.checked});
    }

    private onCaptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, caption : event.target.value});
    }

    private onCssClassChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onValueChange({... this.props.value, className : event.target.value as SideBySideImageCssClass});
    }
}

export default {
    SideBySideImageEditor : AutoUnfocusEditor(SideBySideImageEditor),
    SingleImageEditor : AutoUnfocusEditor(SingleImageEditor),
};
