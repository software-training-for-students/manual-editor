import {UploadImage} from "actions/ImageActions";
import ImagePicker from "components/ImagePicker";
import * as React from "react";
import {connect} from "react-redux";
import {initialState, Store} from "stores";

interface Props {
    uploadedImages: string[];
    onImageChanged: (image: string) => any;
    uploadImage: (image: File) => any;
    currentImage?: string;
}

class ImagePickerWrapper extends React.Component<Props, {}> {
    constructor(props: Props, context?: any) {
        super(props, context);
    }

    public render() {
        return <ImagePicker
            uploadedImages={this.props.uploadedImages!}
            onCurrentImageChange={this.setReusedImage}
            onImageUrlChange={this.setImageUrl}
            onFileUploadChange={this.setUploadedImage}
            defaultImage={this.props.currentImage}
        />;
    }

    private setReusedImage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onImageChanged(e.currentTarget.value);
    }

    private setImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onImageChanged(e.currentTarget.value);
    }

    private setUploadedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.uploadImage!(e.target.files![0]);
        this.props.onImageChanged(e.target.files![0].name);
    }
}

function mapStateToProps(state: Store = initialState) {
    return {
        uploadedImages: Object.getOwnPropertyNames(state.images),
    };
}

const mapActionsToProps = ({
    uploadImage: (image: File) => ({
        type: "uploadImage",
        image,
    } as UploadImage),
});

export default connect(mapStateToProps, mapActionsToProps)(ImagePickerWrapper);
