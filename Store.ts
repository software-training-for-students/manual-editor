import * as DocumentStore from "./DocumentStore";
import * as MenuStore from "./MenuStore";

export interface Store {
    document : DocumentStore.Document;
    menu : MenuStore.MenuStore;
}

export var initialState : Store = {
    document : DocumentStore.initialState,
    menu : MenuStore.initialState
}

export default initialState;