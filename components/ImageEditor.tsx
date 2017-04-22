import ImagePicker from "containers/ImagePicker";
import {SideBySideImage as SideBySideImageProps, SideBySideImageClassName, SingleImage as SingleImageProps, SingleImageClassName} from "core/ElementInfo";
import * as React from "react";

type ImageEditorProps<TImageProps extends {value: any}> = TImageProps & {
    onValueChange: (newProps: TImageProps["value"]) => void;
};

class SingleImageEditor extends React.Component<ImageEditorProps<SingleImageProps>, void> {
    public render() {
        const imageProps = this.props.value;
        return (
            <div className="image-editor">
                <section>
                    <ImagePicker onImageChanged={this.onSourceChanged}  currentImage={imageProps.source} />
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

    private onSourceChanged = (source: string) => {
        this.props.onValueChange({... this.props.value, source});
    }

    private onBorderChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, border : event.target.checked});
    }

    private onCaptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, caption : event.target.value});
    }

    private onCssClassChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onValueChange({... this.props.value, className : event.target.value as SingleImageClassName});
    }

}

// tslint:disable-next-line:max-classes-per-file
class SideBySideImageEditor extends React.Component<ImageEditorProps<SideBySideImageProps>, void> {
    public render() {
        const imageProps = this.props.value;
        return (
            <div className="image-editor">
                <section className="leftSource">
                    <ImagePicker onImageChanged={this.onLeftSourceChanged} currentImage={imageProps.leftSource} />
                </section>
                <section className="rightSource">
                    <ImagePicker onImageChanged={this.onRightSourceChanged} currentImage={imageProps.rightSource} />
                </section>
                <section className="commonSettings">
                    <div>
                        <input type="checkbox" onChange={this.onBorderChanged} checked={imageProps.border} />
                        <label>Has Border?</label>
                    </div>
                    <div>
                        <label>Caption</label>
                        <input type = "text" onChange={this.onCaptionChanged} value={imageProps.caption} />
                    </div>
                    <div>
                        <label>Image Size</label>
                        <select value={imageProps.className} onChange={this.onCssClassChanged}>
                            <option value="sidebyside-image-large">Large</option>
                            <option value="sidebyside-image-small">Small</option>
                        </select>
                    </div>
                </section>
            </div>
        );
    }

    private onLeftSourceChanged = (leftSource: string) => {
        this.props.onValueChange({... this.props.value, leftSource});
    }

    private onRightSourceChanged = (rightSource: string) => {
        this.props.onValueChange({... this.props.value, rightSource});
    }

    private onBorderChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, border : event.target.checked});
    }

    private onCaptionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, caption : event.target.value});
    }

    private onCssClassChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onValueChange({... this.props.value, className : event.target.value as SideBySideImageClassName});
    }
}

export default {
    SideBySideImageEditor,
    SingleImageEditor,
};
