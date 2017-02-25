import * as Redux from "redux";
import {HeadingStore, initialState} from "stores/Menu";
import * as MenuActions from "actions/MenuActions";

var reducer: Redux.Reducer<HeadingStore> =
(store : HeadingStore = initialState.heading, action : MenuActions.UpdateHeadingLevel | MenuActions.UpdateHeadingText) => {
    if(action.type == "update-heading-level") {
        var newStore : HeadingStore = {
            ... store,
            level : action.level
        };
        return newStore;
    }
    else if(action.type == "update-heading-text") {
        var newStore : HeadingStore = {
            ... store,
            text : action.text
        };
        return newStore;
    }
    else {
        return store;
    }
}

export default reducer;