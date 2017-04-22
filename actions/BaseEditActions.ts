import ElementInfo from "core/ElementInfo";
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
    items: ElementInfo[];
    itemToEdit?: number;
    ordering: "before" | "after" | "end";
}

export interface RemoveFromDocument extends EditActionBase {
    type: "removeFromDocument";
}

export default EditActionBase;
