import {Action} from "redux";

export interface EditActionBase extends Action {
    itemId: number;
}

export interface SetIsEditing extends EditActionBase {
    type: "setIsEditing";
    editing: boolean;
}

export interface OnEdited extends EditActionBase {
    type: "onEdited";
    value: string;
}

export interface AddToDocument extends Action {
    type: "addToDocument";
    componentTypeName: string;
    ordering: "before" | "after" | "end";
    defaultProps: any;
}

export default EditActionBase;
