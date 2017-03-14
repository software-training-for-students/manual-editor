import EditableContent from "components/EditableContent";
import Toolbox from "components/Toolbox";
import ToolboxEditor from "components/ToolboxEditor";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "core/DocumentMappers";
import {getCommonInteractiveEditableProps, InteractiveEditableProps} from "core/EditableBase";
import * as React from "react";
import * as ReactRedux from "react-redux";

interface ToolboxEntry {
    imgSrc: string;
    name: string;
    description: string;
}

class EditableToolboxContainer extends EditableContent<ToolboxEntry[]> {};

type Props = InteractiveEditableProps<ToolboxEntry[]>;

const EditableToolbox = (props: Props) => {
    return <EditableToolboxContainer
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={ToolboxEditor}
        staticComponentClass={Toolbox}
    />;
};

export default ReactRedux.connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableToolbox);
