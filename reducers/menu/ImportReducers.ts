import {isFileChanged, isSetImporting} from "actions/ImportLegacyManual";
import {Action} from "redux";
import { initialState } from "stores/Menu";

export default function fileChanged(state = initialState.import, action: Action) {
    if (isFileChanged(action)) {
        return {... state, file: action.file};
    } else if (isSetImporting(action)) {
        return {... state, importing: action.importing };
    }
    return state;
}
