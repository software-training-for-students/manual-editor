import * as React from "react";

interface Props {
    uploadedImages: string[];
    currentImage?: string;
    onImageUrlChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileUploadChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCurrentImageChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ImagePicker = (props: Props) => {
    let defaultSelectorValue = props.uploadedImages.filter((src) => src === props.currentImage).length > 0 ? props.currentImage : undefined;

    return (
        <div>
            <h4>Select an Image</h4>
            <div>
                <span>Re-use an already included image:</span>
                <select onChange={props.onCurrentImageChange} defaultValue={defaultSelectorValue}>
                    {
                        props.uploadedImages.map((image) => (
                            <option value={image}>{image}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <span>Use an image from a url:</span>
                <input type="text" onChange={props.onImageUrlChange} defaultValue={defaultSelectorValue ? undefined : props.currentImage} />
            </div>
            <div>
                <span>Upload a new image:</span>
                <input type="file" onChange={props.onFileUploadChange} />
            </div>
        </div>
    );
};

export default ImagePicker;
