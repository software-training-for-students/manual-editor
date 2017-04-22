import EditableContent from "components/EditableContent";
import * as RichText from "components/RichText";
import connectEditable from "core/connectEditable";
import {getCommonInteractiveEditableProps, InteractivePropsFromElementInfo} from "core/EditableBase";
import {RichText as RichTextInfo} from "core/ElementInfo";
import * as React from "react";

class EditableRichTextContainer extends EditableContent<RichTextInfo["value"]> {}

const EditableRichText = (props: InteractivePropsFromElementInfo<RichTextInfo>) => {
    return <EditableRichTextContainer
        {... props}
        {... getCommonInteractiveEditableProps(props)}
        staticComponentClass={RichText.Presenter}
        inputComponentClass={RichText.Editor}
    />;
};

export default connectEditable()(EditableRichText);
