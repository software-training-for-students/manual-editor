import * as SaveLoadActions from "actions/SaveLoadActions";
import { initialState } from "stores/Menu";

function fileChanged(state: {file?: File} = initialState.load, action: SaveLoadActions.FileChangedAction) {
    if (action.type === "load-file-changed") {
        return {... state, file: action.file};
    }
    return state;
}

export let load = fileChanged;
