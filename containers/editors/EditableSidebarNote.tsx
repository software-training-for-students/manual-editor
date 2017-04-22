import EditableContent from "components/EditableContent";
import SidebarEditor from "components/SidebarEditor";
import SidebarNote from "components/SidebarNote";
import connectEditable from "core/connectEditable";
import {getCommonInteractiveEditableProps, InteractivePropsFromElementInfo} from "core/EditableBase";
import {SidebarNote as SidebarNoteInfo} from "core/ElementInfo";
import * as React from "react";

class EditableSidebar extends EditableContent<SidebarNoteInfo["value"]> {};

type Props = InteractivePropsFromElementInfo<SidebarNoteInfo>;

const EditableSidebarNote = (props: Props) => {
    return <EditableSidebar
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={SidebarEditor}
        staticComponentClass={SidebarNote}
    />;
};

export default connectEditable()(EditableSidebarNote);
