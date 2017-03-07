import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from "draft-js";
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
            // We need to convert to a JSON-serializable structure
            // for saving for element types that don't have JSON-serializable values.
            if (element.elementType === "RichText") {
                let editorState: EditorState = manual[element.itemId].value;
                manual[element.itemId].value = convertToRaw(editorState.getCurrentContent());
            }
            if (element.elementType === "SidebarNote") {
                 // Need to clone the element since we are changing a subproperty.
                manual[element.itemId].value = {... manual[element.itemId].value};
                let editorState: EditorState = manual[element.itemId].value.content;
                manual[element.itemId].value.content = convertToRaw(editorState.getCurrentContent());
            }
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
            manual.elementOrdering.forEach((element) => {
                // We need to convert back from the JSON representation
                // to the in-memory representation for some controls that use
                // non-JSON-serializeable values while editing.
                if (element.elementType === "RichText") {
                    let content: RawDraftContentState = manual[element.itemId].value;
                    manual[element.itemId].value = EditorState.createWithContent(convertFromRaw(content));
                }
                if (element.elementType === "SidebarNote") {
                    let content: RawDraftContentState = manual[element.itemId].value.content;
                    manual[element.itemId].value.content = EditorState.createWithContent(convertFromRaw(content));
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
