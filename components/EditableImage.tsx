import * as React from "react";
import {connect} from "react-redux";
import * as Images from "./Images";
import * as ImageEditor from "./ImageEditor";
import EditableContent from "./EditableContent";
import {EditableProps, InteractiveEditableProps, createEditableStateToPropsMapper, mapBaseActionsToProps} from "../DocumentStore";
import ElementTypes from "../ElementTypes";

class EditableSingleImageContainer extends EditableContent<Images.SingleImageProps> {}

const EditableSingleImage = (props : InteractiveEditableProps<Images.SingleImageProps>) => {
    const toggleIsEditing = () =>
     props.setIsEditing !== undefined ? props.setIsEditing(props.itemId, !props.editing) : void 0;
    const updateValue = (value : Images.SingleImageProps) => props.onEdited !== undefined ? props.onEdited(props.itemId, value) : void 0;

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

function mapImageSpecificState(itemState : InteractiveEditableProps<Images.SingleImageProps>, updatedBaseProps: Partial<EditableProps<any>>) :
    Partial<InteractiveEditableProps<Images.SingleImageProps>> {
        return {... itemState};
}

export default {
    EditableSingleImage : connect(createEditableStateToPropsMapper(mapImageSpecificState), mapBaseActionsToProps)(EditableSingleImage)
}