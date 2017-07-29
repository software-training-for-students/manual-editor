import {isUpdateHeadingLevel, isUpdateHeadingText} from "actions/MenuActions";
import {Action, Reducer} from "redux";
import {HeadingStore, initialState} from "stores/Menu";

let reducer: Reducer<HeadingStore> =
(store: HeadingStore = initialState.heading, action: Action) => {
    if (isUpdateHeadingLevel(action)) {
        let newStore: HeadingStore = {
            ... store,
            level : action.level,
        };
        return newStore;
    } else if (isUpdateHeadingText(action)) {
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
