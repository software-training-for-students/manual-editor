import EditableContent from "components/EditableContent";
import SidebarEditor from "components/SidebarEditor";
import SidebarNote from "components/SidebarNote";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "DocumentMappers";
import {EditorState} from "draft-js";
import {getCommonInteractiveEditableProps, InteractiveEditableProps} from "EditableBase";
import * as React from "react";
import * as ReactRedux from "react-redux";

interface Value {
    title: string;
    content: EditorState;
    imgSource: string;
}

class EditableSidebar extends EditableContent<Value> {};

type Props = InteractiveEditableProps<Value>;

const EditableSidebarNote = (props: Props) => {
    return <EditableSidebar
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={SidebarEditor}
        staticComponentClass={SidebarNote}
    />;
};

export default ReactRedux.connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableSidebarNote);