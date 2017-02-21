import {Action} from "redux";

export interface ActionBase extends Action {
    itemId: number;
}

export interface SetIsEditing extends ActionBase {
    type : "setIsEditing";
    editing : boolean;
}

export interface OnEdited extends ActionBase {
    type : "onEdited";
    value : string;
}

export default ActionBase;