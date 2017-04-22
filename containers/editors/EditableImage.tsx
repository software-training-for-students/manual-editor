import EditableContent from "components/EditableContent";
import ImageEditor from "components/ImageEditor";
import * as Images from "components/Images";
import connectEditable from "core/connectEditable";
import {SingleImage, SideBySideImage} from "core/ElementInfo";
import {getCommonInteractiveEditableProps, InteractivePropsFromElementInfo} from "core/EditableBase";
import * as React from "react";

class EditableSingleImageContainer extends EditableContent<SingleImage["value"]> {}
// tslint:disable-next-line:max-classes-per-file
class EditableSideBySideImageContainer extends EditableContent<SideBySideImage["value"]> {}

const EditableSingleImage = (props: InteractivePropsFromElementInfo<SingleImage>) => {
    return <EditableSingleImageContainer
        {... props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={ImageEditor.SingleImageEditor}
        staticComponentClass={Images.SingleImage}
        inputProps = {props.value}
        staticProps = {props.value}
    />;
};

const EditableSideBySideImage = (props: InteractivePropsFromElementInfo<SideBySideImage>) => {
    return <EditableSideBySideImageContainer
        editing={props.editing}
        inputComponentClass={ImageEditor.SideBySideImageEditor}
        staticComponentClass={Images.SideBySideImages}
        inputProps = {props.value}
        staticProps = {props.value}
        {... getCommonInteractiveEditableProps(props)}
        value ={props.value}
    />;
};

export default {
    EditableSideBySideImage : connectEditable()(EditableSideBySideImage),
    EditableSingleImage : connectEditable()(EditableSingleImage),
};
