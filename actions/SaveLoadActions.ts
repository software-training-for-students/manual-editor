//import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from "draft-js";
import { saveAs } from "file-saver";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {Store} from "stores";
import {Document} from "stores/Document";

export function saveAsThunkAction(): ThunkAction<void, Store, void> {
    return (_, getStore) => {
        // Clone the document object since we have to make changes.
        let document = getStore().document;
        let manual: Document = {
            elementOrdering: document.elementOrdering,
            nextItemId : document.nextItemId,
            1 : document[1],
            2 : document[2],
        };
        manual.elementOrdering.forEach((element) => {
            manual[element.itemId] = {... document[element.itemId]};
        });
        let data = new Blob([JSON.stringify(manual)]);
        saveAs(data, "manual.json");
    };
}

export function loadThunkAction(file: File): ThunkAction<void, Store, void> {
    return (dispatcher) => {
        let loader = new FileReader();
        loader.onload = () => {
            let manual: Document = JSON.parse(loader.result);

            dispatcher(<SetDocumentAction> {
                document : manual,
                type : "set-document",
            });
        };
        loader.readAsText(file);
    };
}

export interface SetDocumentAction extends Action {
    type: "set-document";
    document: Document;
}

export interface FileChangedAction extends Action {
    type: "load-file-changed";
    file: File;
}
