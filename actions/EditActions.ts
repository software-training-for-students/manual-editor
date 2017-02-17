import ActionBase from "./ActionBase";

export interface SetEditModeAction extends ActionBase {
    type : "setEditMode";
    editMode : boolean;
}

export interface OnEditedAction extends ActionBase {
    type : "edited";
    text : string;
}