import * as Document from "./Document";
import * as Flyout from "./Flyout";
import * as Menu from "./Menu";

export interface Store {
    document: Document.Document;
    menu: Menu.MenuStore;
    flyout: Flyout.FlyoutStore;
}

export let initialState: Store = {
    document : Document.initialState,
    flyout : Flyout.initialState,
    menu : Menu.initialState,
};

export default initialState;
