import * as React from "react";

interface Props {
    uploadedImages: string[];
    defaultImage?: string;
    onImageUrlChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileUploadChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCurrentImageChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ImagePicker = (props: Props) => {
    let defaultSelectorValue = props.uploadedImages.filter((src) => src === props.defaultImage).length > 0 ? props.defaultImage : "";

    return (
        <div>
            <h4>Select an Image</h4>
            <div>
                <span>Re-use an already included image:</span>
                <select onChange={props.onCurrentImageChange} defaultValue={defaultSelectorValue}>
                    <option value="" disabled hidden />
                    {
                        props.uploadedImages.map((image) => (
                            <option key={image} value={image}>{image}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <span>Use an image from a url:</span>
                <input type="text" onChange={props.onImageUrlChange} defaultValue={defaultSelectorValue ? undefined : props.defaultImage} />
            </div>
            <div>
                <span>Upload a new image:</span>
                <input type="file" accept="image/*" onChange={props.onFileUploadChange} />
            </div>
        </div>
    );
};

export default ImagePicker;
