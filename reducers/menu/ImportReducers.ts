import {FileChangedAction, SetImportingAction} from "actions/ImportLegacyManual";
import { initialState } from "stores/Menu";

export default function fileChanged(state = initialState.import, action: FileChangedAction | SetImportingAction) {
    if (action.type === "import-file-changed") {
        return {... state, file: action.file};
    } else if (action.type === "set-import") {
        return {... state, importing: action.importing };
    }
    return state;
}
