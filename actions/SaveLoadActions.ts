import { saveAs } from "file-saver";
import * as JSZip from "jszip";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {Store} from "stores";
import {Document} from "stores/Document";
import { UploadImage } from "./ImageActions";

export const saveVersion: number = 1;

export function saveAsThunkAction(): ThunkAction<void, Store, void> {
    return async (_, getStore) => {
        // Clone the document object since we have to make changes.
        let manualFile = new JSZip();
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
        manualFile.file("manual.json", JSON.stringify(manual));
        manualFile.file("version", saveVersion.toString());
        for (let key in getStore().images) {
            if (getStore().images.hasOwnProperty(key)) {
                let image = getStore().images[key];
                manualFile.file(key, image.image);
            }
        }
        let blob: Blob = await manualFile.generateAsync({type: "blob"});
        saveAs(blob, manual[1].value.toString() + ".uwstsmanual");
    };
}

export function loadThunkAction(zipFile: File): ThunkAction<void, Store, void> {
    return async (dispatcher) => {
        let zip = new JSZip();
        zip = await zip.loadAsync(zipFile);
        let version = parseInt(await zip.file("version").async("text"), 10);
        let document: Document = JSON.parse(await zip.file("manual.json").async("text"));
        dispatcher(<SetDocumentAction> {
            document,
            type : "set-document",
            version,
        });
        dispatcher(<ClearImagesAction> {
            type: "clear-images",
        });
        await Promise.all(Object.getOwnPropertyNames(zip.files).map(async (file) => {
            if (file === "manual.json" || file === "version") {
                return;
            } else {
                let blob: Blob = await zip.files[file].async("blob");
                dispatcher(<UploadImage> {
                    image: new File([blob], file),
                    type: "uploadImage",
                });
            }
        }));
    };
}

export interface SetDocumentAction extends Action {
    type: "set-document";
    document: Document;
    version?: number;
}

export interface FileChangedAction extends Action {
    type: "load-file-changed";
    file: File;
}

export interface ClearImagesAction extends Action {
    type: "clear-images";
}
