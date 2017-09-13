import EditableElement from "components/EditableElement";
import * as RichText from "components/RichText";
import connectEditable from "core/connectEditable";
import {RichText as RichTextInfo} from "core/ElementInfo";
import InteractivePropsFromElementInfo from "core/InteractivePropsFromElementInfo";
import * as React from "react";

const EditableRichText = (props: InteractivePropsFromElementInfo<RichTextInfo>) => {
    const EditableRichTextContainer: new(...args: any[]) => EditableElement<RichTextInfo> = EditableElement;
    return <EditableRichTextContainer
        {... props}
        staticComponentClass={RichText.Presenter}
        inputComponentClass={RichText.Editor}
    />;
};

export default connectEditable(EditableRichText);
