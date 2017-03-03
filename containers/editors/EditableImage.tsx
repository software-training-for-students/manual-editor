import EditableContent from "components/EditableContent";
import ImageEditor from "components/ImageEditor";
import * as Images from "components/Images";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "DocumentMappers";
import {getCommonInteractiveEditableProps, InteractiveEditableProps} from "EditableBase";
import * as React from "react";
import {connect} from "react-redux";

class EditableSingleImageContainer extends EditableContent<Images.SingleImageProps> {}
// tslint:disable-next-line:max-classes-per-file
class EditableSideBySideImageContainer extends EditableContent<Images.SideBySideImageProps> {}

const EditableSingleImage = (props: InteractiveEditableProps<Images.SingleImageProps>) => {

    const {toggleIsEditing, updateValue} = getCommonInteractiveEditableProps(props);

    return <EditableSingleImageContainer
        editing = {props.editing}
        inputComponentClass={ImageEditor.SingleImageEditor}
        staticComponentClass={Images.SingleImage}
        inputProps = {props.value}
        staticProps = {props.value}
        toggleIsEditing = {toggleIsEditing}
        updateValue = {updateValue}
        value = {props.value}
    />;
};

const EditableSideBySideImage = (props: InteractiveEditableProps<Images.SideBySideImageProps>) => {
    const {toggleIsEditing, updateValue} = getCommonInteractiveEditableProps(props);

    return <EditableSideBySideImageContainer
        editing={props.editing}
        inputComponentClass={ImageEditor.SideBySideImageEditor}
        staticComponentClass={Images.SideBySideImages}
        inputProps = {props.value}
        staticProps = {props.value}
        toggleIsEditing={toggleIsEditing}
        updateValue = {updateValue}
        value ={props.value}
    />;
};

export default {
    EditableSideBySideImage : connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableSideBySideImage),
    EditableSingleImage : connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableSingleImage),
};
