import * as Document from "./Document";
import * as Flyout from "./Flyout";
import * as Images from "./Images";
import * as Menu from "./Menu";

export interface Store {
    document: Document.Document;
    menu: Menu.MenuStore;
    flyout: Flyout.FlyoutStore;
    images: Images.ImagesStore;
}

export let initialState: Store = {
    document : Document.initialState,
    flyout : Flyout.initialState,
    images: Images.initialState,
    menu : Menu.initialState,
};
