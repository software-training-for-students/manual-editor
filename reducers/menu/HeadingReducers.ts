import * as MenuActions from "actions/MenuActions";
import * as Redux from "redux";
import {HeadingStore, initialState} from "stores/Menu";

let reducer: Redux.Reducer<HeadingStore> =
(store: HeadingStore = initialState.heading, action: MenuActions.UpdateHeadingLevel | MenuActions.UpdateHeadingText) => {
    if (action.type === "update-heading-level") {
        let newStore: HeadingStore = {
            ... store,
            level : action.level,
        };
        return newStore;
    } else if (action.type === "update-heading-text") {
        let newStore: HeadingStore = {
            ... store,
            text : action.text,
        };
        return newStore;
    } else {
        return store;
    }
};

export default reducer;
