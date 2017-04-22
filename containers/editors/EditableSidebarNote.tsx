import EditableElement from "components/EditableElement";
import SidebarEditor from "components/SidebarEditor";
import SidebarNote from "components/SidebarNote";
import connectEditable from "core/connectEditable";
import {InteractivePropsFromElementInfo} from "core/EditableBase";
import {SidebarNote as SidebarNoteInfo} from "core/ElementInfo";
import * as React from "react";

const EditableSidebarNote = (props: InteractivePropsFromElementInfo<SidebarNoteInfo>) => {
    const EditableSidebar: new(...args: any[]) => EditableElement<SidebarNoteInfo> = EditableElement;
    return <EditableSidebar
        {...props}
        inputComponentClass={SidebarEditor}
        staticComponentClass={SidebarNote}
    />;
};

export default connectEditable()(EditableSidebarNote);
