import CodePresenter from "components/CodePresenter";
import EditableElement from "components/EditableElement";
import PlainTextEditor from "components/PlainTextEditor";
import connectEditable from "core/connectEditable";
import {InteractivePropsFromElementInfo} from "core/EditableBase";
import {Code} from "core/ElementInfo";
import * as React from "react";

const EditableCode = (props: InteractivePropsFromElementInfo<Code>) => {
    const EditableCodeBlock: new(...args: any[]) => EditableElement<Code> = EditableElement;
    return <EditableCodeBlock
        {...props}
        inputComponentClass={PlainTextEditor}
        staticComponentClass={CodePresenter}
        staticProps={{language : props.language}}
        inputProps={
            {
                rows : 15,
            }
        }
    />;
};

export default connectEditable()(EditableCode);
