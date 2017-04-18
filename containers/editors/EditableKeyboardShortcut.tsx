import EditableContent from "components/EditableContent";
import KeyboardShortcutSidebarEditor from "components/KeyboardShortcutSidebarEditor";
import KeyboardShortcutSidebarPresenter from "components/KeyboardShortcutSidebarPresenter";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "core/DocumentMappers";
import {getCommonInteractiveEditableProps, InteractiveEditableProps} from "core/EditableBase";
import KeyToImageMap from "core/KeyToImageMap";
import {RawDraftContentState} from "draft-js";
import * as React from "react";
import * as ReactRedux from "react-redux";

interface Value {
    title: string;
    content: RawDraftContentState;
    shortcuts: Array<Array<keyof typeof KeyToImageMap>>;
    type: "no-shortcut" | "shortcut" | "multi-shortcut";
}

class EditableShortcut extends EditableContent<Value> {};

const EditableKeyboardShortcut = (props: InteractiveEditableProps<Value>) => {
    return <EditableShortcut
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={KeyboardShortcutSidebarEditor}
        staticComponentClass={KeyboardShortcutSidebarPresenter}
    />;
};


export default ReactRedux.connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableKeyboardShortcut);
