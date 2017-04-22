import CodePresenter from "components/CodePresenter";
import EditableContent from "components/EditableContent";
import PlainTextEditor from "components/PlainTextEditor";
import connectEditable from "core/connectEditable";
import {getCommonInteractiveEditableProps, InteractivePropsFromElementInfo} from "core/EditableBase";
import {Code} from "core/ElementInfo";
import * as React from "react";

class EditableCodeBlock extends EditableContent<Code["value"]> {};

type Props = InteractivePropsFromElementInfo<Code>;

const EditableCode = (props: Props) => {
    return <EditableCodeBlock
        {...props}
        {...getCommonInteractiveEditableProps(props)}
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
