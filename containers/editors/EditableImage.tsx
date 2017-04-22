import EditableElement from "components/EditableElement";
import ImageEditor from "components/ImageEditor";
import * as Images from "components/Images";
import connectEditable from "core/connectEditable";
import {InteractivePropsFromElementInfo} from "core/EditableBase";
import {SideBySideImage, SingleImage} from "core/ElementInfo";
import * as React from "react";

const EditableSingleImage = (props: InteractivePropsFromElementInfo<SingleImage>) => {
    const EditableImageContainer: new(...args: any[]) => EditableElement<SingleImage> = EditableElement;
    return <EditableImageContainer
        {... props}
        inputComponentClass={ImageEditor.SingleImageEditor}
        staticComponentClass={Images.SingleImage}
        inputProps = {props.value}
        staticProps = {props.value}
    />;
};

const EditableSideBySideImage = (props: InteractivePropsFromElementInfo<SideBySideImage>) => {
    const EditableImageContainer: new(...args: any[]) => EditableElement<SideBySideImage> = EditableElement;
    return <EditableImageContainer
        {... props}
        inputComponentClass={ImageEditor.SideBySideImageEditor}
        staticComponentClass={Images.SideBySideImages}
        inputProps = {props.value}
        staticProps = {props.value}
    />;
};

export default {
    EditableSideBySideImage : connectEditable()(EditableSideBySideImage),
    EditableSingleImage : connectEditable()(EditableSingleImage),
};
