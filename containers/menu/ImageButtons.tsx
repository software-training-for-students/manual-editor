import * as React from "react";
import {connect} from "react-redux";
import ImageEditors from "components/ImageEditor";
import MenuItem from "containers/MenuItem";
import {SingleImageProps, SideBySideImageProps} from "components/Images";
import {Store, initialState} from "stores";
import {AddToDocument} from "actions/BaseEditActions";
import {UpdateSingleImageProps, UpdateSideBySideImageProps} from "actions/MenuActions";


interface CreateImageProps<TImageProps> {
    onCreate? : (componentTypeName : string,
        defaultProps : {value : TImageProps},
        ordering: "before" | "after" | "end") => void;
    imageProps : TImageProps;
    onImagePropsChanged? : (imageProps : TImageProps) => void;
}

class SingleImageButton extends React.Component<CreateImageProps<SingleImageProps>, void> {
    public render() {
        return (
            <MenuItem menuItemId="single-images" menuItemText="Single Image"
                menuItemHeading="Create Single Image"
                onCreate={this.onCreate}
                insertEnabled={this.props.imageProps.source.length !== 0}>
                <ImageEditors.SingleImageEditor onComplete={() => {}} value={this.props.imageProps} onValueChange={this.onValueChange} />
            </MenuItem>
        );
    }

    private onCreate = (ordering : "before" | "after" | "end") => {
        if(this.props.onCreate)
            this.props.onCreate("SingleImage", {value : this.props.imageProps}, ordering);
    }

    private onValueChange = (value : SingleImageProps) => {
        if(this.props.onImagePropsChanged)
            this.props.onImagePropsChanged(value);
    }
}

function mapStateToSingleImageProps(state : Store = initialState) : CreateImageProps<SingleImageProps> {
    return {imageProps : {... state.menu.singleImage} };
}

const mapActionsToSingleImageProps = ({
    onCreate : (componentTypeName : string,
        defaultProps : any,
        ordering: "before" | "after" | "end") => ({
            type : "addToDocument",
            componentTypeName,
            ordering,
            defaultProps
        } as AddToDocument),
    onImagePropsChanged : (value : SingleImageProps) => ({
        type : "update-single-image-props",
        props : value
    } as UpdateSingleImageProps)
});

class SideBySideImageButton extends React.Component<CreateImageProps<SideBySideImageProps>, void> {
    public render() {
        return (
            <MenuItem menuItemId="sidebyside-images" menuItemText="Side By Side Images"
                menuItemHeading="Create Side By Side Images"
                onCreate={this.onCreate}
                insertEnabled={this.props.imageProps.leftSource.length !== 0 && this.props.imageProps.rightSource.length !== 0}>
                <ImageEditors.SideBySideImageEditor onComplete={() => {}} value={this.props.imageProps} onValueChange={this.onValueChange} />
            </MenuItem>
        );
    }

    private onCreate = (ordering : "before" | "after" | "end") => {
        if(this.props.onCreate)
            this.props.onCreate("SideBySideImage", {value : this.props.imageProps}, ordering);
    }

    private onValueChange = (value : SideBySideImageProps) => {
        if(this.props.onImagePropsChanged)
            this.props.onImagePropsChanged(value);
    }
}

function mapStateToSideBySideImageProps(state : Store = initialState) : CreateImageProps<SideBySideImageProps> {
    return {imageProps : {... state.menu.sideBySideImage} };
}

const mapActionsToSideBySideImageProps = ({
    onCreate : (componentTypeName : string,
        defaultProps : any,
        ordering: "before" | "after" | "end") => ({
            type : "addToDocument",
            componentTypeName,
            ordering,
            defaultProps
        } as AddToDocument),
    onImagePropsChanged : (value : SideBySideImageProps) => ({
        type : "update-sidebyside-image-props",
        props : value
    } as UpdateSideBySideImageProps)
});

export default {
    SingleImageButton : connect(mapStateToSingleImageProps, mapActionsToSingleImageProps)(SingleImageButton),
    SideBySideImageButton : connect(mapStateToSideBySideImageProps, mapActionsToSideBySideImageProps)(SideBySideImageButton)
}