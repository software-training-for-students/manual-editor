import EditableElement from "components/EditableElement";
import KeyboardShortcutSidebarEditor from "components/KeyboardShortcutSidebarEditor";
import KeyboardShortcutSidebarPresenter from "components/KeyboardShortcutSidebarPresenter";
import connectEditable from "core/connectEditable";
import {KeyboardShortcut} from "core/ElementInfo";
import InteractivePropsFromElementInfo from "core/InteractivePropsFromElementInfo";
import * as React from "react";

const EditableKeyboardShortcut = (props: InteractivePropsFromElementInfo<KeyboardShortcut>) => {
    const EditableShortcut: new(...args: any[]) => EditableElement<KeyboardShortcut> = EditableElement;
    return <EditableShortcut
        {...props}
        inputComponentClass={KeyboardShortcutSidebarEditor}
        staticComponentClass={KeyboardShortcutSidebarPresenter}
    />;
};

export default connectEditable()(EditableKeyboardShortcut);
