import * as React from "react";
import {connect} from "react-redux";
import * as Images from "components/Images";
import ImageEditor from "components/ImageEditor";
import {EditableProps, InteractiveEditableProps, getCommonInteractiveEditableProps} from "EditableBase";
import EditableContent from "components/EditableContent";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "DocumentMappers";
import ElementTypes from "ElementTypes";

class EditableSingleImageContainer extends EditableContent<Images.SingleImageProps> {}

const EditableSingleImage = (props : InteractiveEditableProps<Images.SingleImageProps>) => {

    const {toggleIsEditing, updateValue} = getCommonInteractiveEditableProps(props);
    
    return <EditableSingleImageContainer
        editing = {props.editing}
        inputComponentClass={ImageEditor.SingleImageEditor}
        staticComponentClass={Images.SingleImage}
        inputProps = {props.value}
        staticProps = {props.value} 
        toggleIsEditing = {toggleIsEditing}
        updateValue = {updateValue}
        value = {props.value} />
}

export default {
    EditableSingleImage : connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableSingleImage)
}