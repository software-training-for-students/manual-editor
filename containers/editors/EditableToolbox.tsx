import EditableElement from "components/EditableElement";
import Toolbox from "components/Toolbox";
import ToolboxEditor from "components/ToolboxEditor";
import connectEditable from "core/connectEditable";
import {Toolbox as ToolboxInfo} from "core/ElementInfo";
import InteractivePropsFromElementInfo from "core/InteractivePropsFromElementInfo";
import * as React from "react";

const EditableToolbox = (props: InteractivePropsFromElementInfo<ToolboxInfo>) => {
    const EditableToolboxContainer: new(...args: any[]) => EditableElement<ToolboxInfo> = EditableElement;
    return <EditableToolboxContainer
        {...props}
        inputComponentClass={ToolboxEditor}
        staticComponentClass={Toolbox}
    />;
};

export default connectEditable()(EditableToolbox);
