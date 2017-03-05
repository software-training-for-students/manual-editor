import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from "draft-js";
import { saveAs } from "file-saver";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {Store} from "stores";
import {Document} from "stores/Document";

export function saveAsThunkAction(): ThunkAction<void, Store, void> {
    return (_, getStore) => {
        let documentToSave = getStore().document;
        documentToSave.elementOrdering.forEach((element) => {
            // We need to convert to a JSON-serializable structure
            // for saving for element types that don't have JSON-serializable values.
            if (element.elementType === "RichText") {
                let editorState: EditorState = documentToSave[element.itemId].value;
                documentToSave[element.itemId].value = convertToRaw(editorState.getCurrentContent());
            }
        });
        let data = new Blob([JSON.stringify(documentToSave)]);
        saveAs(data, "manual.json");
    };
}

export function loadThunkAction(file: File): ThunkAction<void, Store, void> {
    return (dispatcher) => {
        let loader = new FileReader();
        loader.onload = () => {
            let manual: Document = JSON.parse(loader.result);
            manual.elementOrdering.forEach((element) => {
                // We need to convert back from the JSON representation
                // to the in-memory representation for some controls that use
                // non-JSON-serializeable values while editing.
                if (element.elementType === "RichText") {
                    let content: RawDraftContentState = manual[element.itemId].value;
                    manual[element.itemId].value = EditorState.createWithContent(convertFromRaw(content));
                }
            });

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
