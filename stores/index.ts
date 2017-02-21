import * as Document from "./Document";
import * as Menu from "./Menu";
import * as Flyout from "./Flyout";

export interface Store {
    document : Document.Document;
    menu : Menu.MenuStore;
    flyout : Flyout.FlyoutStore;
}

export var initialState : Store = {
    document : Document.initialState,
    menu : Menu.initialState,
    flyout : Flyout.initialState
}

export default initialState;