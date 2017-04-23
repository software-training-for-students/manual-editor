import { saveAs } from "file-saver";
import * as JSZip from "jszip";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {Store} from "stores";
import {Document} from "stores/Document";
import { UploadImage } from "./ImageActions";

export const saveVersion: number = 1;

export function saveAsThunkAction(): ThunkAction<void, Store, void> {
    return (_, getStore) => {
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
        manualFile.generateAsync({type: "blob"}).then((blob: Blob) => saveAs(blob, manual[1].value.toString() + ".uwstsmanual"));
    };
}

export function loadThunkAction(zipFile: File): ThunkAction<void, Store, void> {
    return (dispatcher) => {
        let zip = new JSZip();
        zip.loadAsync(zipFile).then((loadedZip) => {
            loadedZip.file("manual.json").async("text").then((text: string) => {
                loadedZip.file("version").async("text").then((versionString: string) => {
                    let document: Document = JSON.parse(text);
                    let version = parseInt(versionString, 10);
                    dispatcher(<SetDocumentAction> {
                        document,
                        type : "set-document",
                        version,
                    });
                });
            }).then(() => {
                dispatcher(<ClearImagesAction> {
                    type: "clear-images",
                });
                for (let fileName in loadedZip.files) {
                    if (loadedZip.files.hasOwnProperty(fileName)) {
                        let file = loadedZip.files[fileName];
                        file.async("blob").then((data: Blob) => {
                            dispatcher(<UploadImage> {
                                image: new File([data], fileName),
                                type: "uploadImage",
                            });
                        });
                    }
                }
            });
        });
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
