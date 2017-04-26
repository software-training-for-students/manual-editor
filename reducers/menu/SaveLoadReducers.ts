import * as SaveLoadActions from "actions/SaveLoadActions";
import { initialState } from "stores/Menu";

function fileChanged(state = initialState.load, action: SaveLoadActions.FileChangedAction | SaveLoadActions.SetLoadingAction) {
    if (action.type === "load-file-changed") {
        return {... state, file: action.file};
    } else if (action.type === "set-loading") {
        return {... state, loading: action.loading};
    }
    return state;
}

export let load = fileChanged;
