import {FileChangedAction} from "actions/ImportLegacyManual";
import { initialState } from "stores/Menu";

export default function fileChanged(state: {file?: File} = initialState.import, action: FileChangedAction) {
    if (action.type === "import-file-changed") {
        return {... state, file: action.file};
    }
    return state;
}
