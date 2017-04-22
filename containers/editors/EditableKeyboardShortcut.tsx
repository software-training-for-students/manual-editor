import EditableContent from "components/EditableContent";
import KeyboardShortcutSidebarEditor from "components/KeyboardShortcutSidebarEditor";
import KeyboardShortcutSidebarPresenter from "components/KeyboardShortcutSidebarPresenter";
import connectEditable from "core/connectEditable";
import {getCommonInteractiveEditableProps, InteractivePropsFromElementInfo} from "core/EditableBase";
import {KeyboardShortcut} from "core/ElementInfo";
import * as React from "react";

class EditableShortcut extends EditableContent<KeyboardShortcut["value"]> {};

const EditableKeyboardShortcut = (props: InteractivePropsFromElementInfo<KeyboardShortcut>) => {
    return <EditableShortcut
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={KeyboardShortcutSidebarEditor}
        staticComponentClass={KeyboardShortcutSidebarPresenter}
    />;
};


export default connectEditable()(EditableKeyboardShortcut);
