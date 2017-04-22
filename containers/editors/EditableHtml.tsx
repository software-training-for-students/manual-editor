import EditableContent from "components/EditableContent";
import HtmlPresenter from "components/HtmlPresenter";
import PlainTextEditor from "components/PlainTextEditor";
import connectEditable from "core/connectEditable";
import {getCommonInteractiveEditableProps, InteractivePropsFromElementInfo} from "core/EditableBase";
import {RawHtml} from "core/ElementInfo";
import * as React from "react";

class EditableRawHtml extends EditableContent<RawHtml["value"]> {};

const EditableHtml = (props: InteractivePropsFromElementInfo<RawHtml>) => {
    return <EditableRawHtml
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={PlainTextEditor}
        staticComponentClass={HtmlPresenter}
    />;
};

export default connectEditable()(EditableHtml);
