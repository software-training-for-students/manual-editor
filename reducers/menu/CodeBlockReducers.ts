import { isUpdateCodeLanguage } from "actions/MenuActions";
import { Action } from "redux";
import { initialState } from "stores/Menu";

export default function updateCodeLanguage(store: {language: string} = initialState.code, action: Action) {
    if (isUpdateCodeLanguage(action)) {
        return {...store, language : action.language};
    }
    return store;
}
