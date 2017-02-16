import {Action} from "redux";

export interface Editable {
    itemId : number;
}

export interface ActionBase extends Action {
    itemId: number;
}

// Redux mapping and reducing functions can use this interface to get strongly typed data.
export interface DocumentView<TProps> {
    [itemId : number] : TProps;
}

export interface Document extends DocumentView<any> {}