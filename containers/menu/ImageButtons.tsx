import {UpdateSideBySideImageProps, UpdateSingleImageProps} from "actions/MenuActions";
import ImageEditors from "components/ImageEditor";
import {SideBySideImageProps, SingleImageProps} from "components/Images";
import MenuItem from "containers/MenuItem";
import * as React from "react";
import {connect} from "react-redux";
import {initialState, Store} from "stores";

const noop = () => void 0;

interface CreateImageProps<TImageProps> {
    imageProps: TImageProps;
    onImagePropsChanged?: (imageProps: TImageProps) => void;
}

class SingleImageButton extends React.Component<CreateImageProps<SingleImageProps>, void> {
    public render() {
        return (
            <MenuItem
                menuItemId="single-images"
                menuItemText="Single Image"
                menuItemHeading="Create Single Image"
                insertEnabled={this.props.imageProps.source.length !== 0}
                defaultValue={{value: this.props.imageProps}}
                elementType="SingleImage"
            >
                <ImageEditors.SingleImageEditor onComplete={noop} value={this.props.imageProps} onValueChange={this.onValueChange} />
            </MenuItem>
        );
    }

    private onValueChange = (value: SingleImageProps) => {
        if (this.props.onImagePropsChanged) {
            this.props.onImagePropsChanged(value);
        }
    }
}

function mapStateToSingleImageProps(state: Store = initialState): CreateImageProps<SingleImageProps> {
    return {imageProps: {... state.menu.singleImage} };
}

const mapActionsToSingleImageProps = ({
    onImagePropsChanged: (value: SingleImageProps) => ({
        props: value,
        type: "update-single-image-props",
    } as UpdateSingleImageProps),
});

// tslint:disable-next-line:max-classes-per-file
class SideBySideImageButton extends React.Component<CreateImageProps<SideBySideImageProps>, void> {
    public render() {
        return (
            <MenuItem
                menuItemId="sidebyside-images"
                menuItemText="Side By Side Images"
                menuItemHeading="Create Side By Side Images"
                insertEnabled={this.props.imageProps.leftSource.length !== 0 && this.props.imageProps.rightSource.length !== 0}
                elementType="SideBySideImage"
                defaultValue={{value: this.props.imageProps}}
            >
                <ImageEditors.SideBySideImageEditor onComplete={noop} value={this.props.imageProps} onValueChange={this.onValueChange} />
            </MenuItem>
        );
    }

    private onValueChange = (value: SideBySideImageProps) => {
        if (this.props.onImagePropsChanged) {
            this.props.onImagePropsChanged(value);
        }
    }
}

function mapStateToSideBySideImageProps(state: Store = initialState): CreateImageProps<SideBySideImageProps> {
    return {imageProps: {... state.menu.sideBySideImage} };
}

const mapActionsToSideBySideImageProps = ({
    onImagePropsChanged: (value: SideBySideImageProps) => ({
        props: value,
        type: "update-sidebyside-image-props",
    } as UpdateSideBySideImageProps),
});

export default {
    SideBySideImageButton: connect(mapStateToSideBySideImageProps, mapActionsToSideBySideImageProps)(SideBySideImageButton),
    SingleImageButton: connect(mapStateToSingleImageProps, mapActionsToSingleImageProps)(SingleImageButton),
};
