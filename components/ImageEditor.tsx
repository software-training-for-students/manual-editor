import * as React from "react";
import {SingleImageProps, SingleImageCssClass, SideBySideImageProps} from "./Images";

interface ImageEditorProps<TImageProps> {
    value : TImageProps | undefined
    onValueChange? : (newProps: TImageProps) => void;
    onClick?: React.EventHandler<React.SyntheticEvent<HTMLElement>>
    onComplete : () => void
}

export const SingleImageEditor : React.StatelessComponent<ImageEditorProps<SingleImageProps>> =
     (props:ImageEditorProps<SingleImageProps>) => {
    const onSourceChanged = (event : React.ChangeEvent<HTMLInputElement>) => props.onValueChange !== undefined ?
         props.onValueChange({... props.value, source : event.target.value}) : void 0;
    const onBorderChanged = (event : React.ChangeEvent<HTMLInputElement>) => props.onValueChange !== undefined ?
         props.onValueChange({... props.value, border : event.target.checked}) : void 0;

    const onCaptionChanged = (event : React.ChangeEvent<HTMLInputElement>) => props.onValueChange !== undefined ?
         props.onValueChange({... props.value, caption : event.target.value as string}) : void 0;
         
    const onCssClassChanged = (event : React.ChangeEvent<HTMLSelectElement>) => props.onValueChange !== undefined ?
         props.onValueChange({... props.value, className : event.target.value as SingleImageCssClass}) : void 0;

    const onSubmitClicked = () => 
        props.onComplete !== undefined ? props.onComplete() : void 0;

    var imageProps : Partial<SingleImageProps> = props.value !== undefined ? props.value : {
        className : undefined,
        source : "",
        caption : "",
        border : false
    }

    return (
    <div onClick={props.onClick}>
        <section>
            <label>Image Source</label>
            <input type = "url" onChange={onSourceChanged} value={imageProps.source} size={80} />
        </section>
        <section>
            <input type="checkbox" onChange={onBorderChanged} checked={imageProps.border} />
            <label>Has Border?</label>
        </section>
        <section>
            <label>Caption</label>
            <input type = "text" onChange={onCaptionChanged} value={imageProps.caption} />
        </section>
        <section>
            <label>Image Style</label>
            <select value={imageProps.className} onChange={onCssClassChanged}>
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
        <button onClick={onSubmitClicked}>Save</button>
    </div>
    );
        
}