import { isFileChanged, isSetLoading } from "actions/SaveLoadActions";
import { Action } from "redux";
import { initialState } from "stores/Menu";

function fileChanged(state = initialState.load, action: Action) {
    if (isFileChanged(action)) {
        return {... state, file: action.file};
    } else if (isSetLoading(action)) {
        return {... state, loading: action.loading};
    }
    return state;
}

export let load = fileChanged;
