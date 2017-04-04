import {UploadImage} from "actions/ImageActions";
import ImagePicker from "components/ImagePicker";
import * as React from "react";
import {connect} from "react-redux";
import {initialState, Store} from "stores";

interface Props {
    uploadedImages?: string[];
    onImageChanged: (image: string) => void;
    uploadImage?: (image: File) => void;
    currentImage?: string;
}

interface State {
    imageType: "imageUrl" | "uploadedImage";
    imageUrl: string | null;
    uploadedImage: File | null;
}

class ImagePickerWrapper extends React.Component<Props, State> {
    constructor(props: Props, context?: any) {
        super(props, context);
        this.state = {
            imageType: "imageUrl",
            imageUrl: this.props.currentImage || (props.uploadedImages && props.uploadedImages.length > 0 ? props.uploadedImages[0] : ""),
            uploadedImage: null,
        };
    }

    public render() {
        return <ImagePicker
            uploadedImages={this.props.uploadedImages!}
            onCurrentImageChange={this.setReusedImage}
            onImageUrlChange={this.setImageUrl}
            onFileUploadChange={this.setUploadedImage}
            currentImage={this.props.currentImage}
        />;
    }

    public componentWillUnmount() {
        if (this.state.imageType === "uploadedImage") {
            this.props.uploadImage!(this.state.uploadedImage!);
            this.props.onImageChanged(this.state.uploadedImage!.name);
        } else {
            this.props.onImageChanged(this.state.imageUrl!);
        }
    }

    private setReusedImage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            imageType: "imageUrl",
            imageUrl: e.currentTarget.value,
        });
    }

    private setImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            imageType: "imageUrl",
            imageUrl: e.currentTarget.value,
        });
    }

    private setUploadedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            imageType: "uploadedImage",
            uploadedImage: e.target.files![0],
        });
    }
}

function mapStateToProps(state: Store = initialState, oldProps: Props): Partial<Props> {
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
