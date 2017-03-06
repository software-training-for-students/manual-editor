import CodePresenter from "components/CodePresenter";
import EditableContent from "components/EditableContent";
import PlainTextEditor from "components/PlainTextEditor";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "DocumentMappers";
import {getCommonInteractiveEditableProps, InteractiveEditableProps} from "EditableBase";
import * as React from "react";
import * as ReactRedux from "react-redux";

class EditableCodeBlock extends EditableContent<string> {};

type Props = InteractiveEditableProps<string> & {language: string};

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

export default ReactRedux.connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableCode);
