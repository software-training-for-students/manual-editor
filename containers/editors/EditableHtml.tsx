import EditableElement from "components/EditableElement";
import HtmlPresenter from "components/HtmlPresenter";
import PlainTextEditor from "components/PlainTextEditor";
import connectEditable from "core/connectEditable";
import {InteractivePropsFromElementInfo} from "core/EditableBase";
import {RawHtml} from "core/ElementInfo";
import * as React from "react";

const EditableHtml = (props: InteractivePropsFromElementInfo<RawHtml>) => {
    const EditableHtmlBlock: new(...args: any[]) => EditableElement<RawHtml> = EditableElement;
    return <EditableHtmlBlock
        {...props}
        inputComponentClass={PlainTextEditor}
        staticComponentClass={HtmlPresenter}
    />;
};

export default connectEditable()(EditableHtml);
