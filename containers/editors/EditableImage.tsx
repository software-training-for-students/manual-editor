import EditableElement from "components/EditableElement";
import ImageEditor from "components/ImageEditor";
import * as Images from "components/Images";
import connectEditable from "core/connectEditable";
import {SideBySideImage, SingleImage} from "core/ElementInfo";
import InteractivePropsFromElementInfo from "core/InteractivePropsFromElementInfo";
import * as React from "react";

const EditableSingleImage = (props: InteractivePropsFromElementInfo<SingleImage>) => {
    const EditableImageContainer: new(...args: any[]) => EditableElement<SingleImage> = EditableElement;
    return <EditableImageContainer
        {... props}
        inputComponentClass={ImageEditor.SingleImageEditor}
        staticComponentClass={Images.SingleImage}
    />;
};

const EditableSideBySideImage = (props: InteractivePropsFromElementInfo<SideBySideImage>) => {
    const EditableImageContainer: new(...args: any[]) => EditableElement<SideBySideImage> = EditableElement;
    return <EditableImageContainer
        {... props}
        inputComponentClass={ImageEditor.SideBySideImageEditor}
        staticComponentClass={Images.SideBySideImages}
    />;
};

export default {
    EditableSideBySideImage : connectEditable(EditableSideBySideImage),
    EditableSingleImage : connectEditable(EditableSingleImage),
};
