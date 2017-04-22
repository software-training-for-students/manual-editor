import EditableContent from "components/EditableContent";
import Toolbox from "components/Toolbox";
import ToolboxEditor from "components/ToolboxEditor";
import connectEditable from "core/connectEditable";
import {getCommonInteractiveEditableProps, InteractivePropsFromElementInfo} from "core/EditableBase";
import {Toolbox as ToolboxInfo} from "core/ElementInfo";
import * as React from "react";

class EditableToolboxContainer extends EditableContent<ToolboxInfo["value"]> {};

type Props = InteractivePropsFromElementInfo<ToolboxInfo>;

const EditableToolbox = (props: Props) => {
    return <EditableToolboxContainer
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={ToolboxEditor}
        staticComponentClass={Toolbox}
    />;
};

export default connectEditable()(EditableToolbox);
