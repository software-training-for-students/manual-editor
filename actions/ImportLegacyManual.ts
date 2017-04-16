import importManualHtml from "core/importManualHtml";
import * as JSZip from "jszip";
import {ThunkAction} from "redux-thunk";
import {Store} from "stores";
import {UploadImage} from "./ImageActions";
import {ClearImagesAction, SetDocumentAction} from "./SaveLoadActions";

export default function(legacyFile: File): ThunkAction<void, Store, void> {
    return (dispatch) => {
        let legacyZip = new JSZip();
        legacyZip.loadAsync(legacyFile).then((zip) => {
            zip = zip.folder(legacyFile.name.substr(0, legacyFile.name.length - ".zip".length));
            zip.file("manual.html").async("string").then((html) => {
                let newManual = importManualHtml(html);
                dispatch(<SetDocumentAction> {
                    document: newManual,
                    type: "set-document",
                });
            });

            dispatch(<ClearImagesAction> {
                type: "clear-images",
            });

            const uploadImage = (path: string, file: JSZipObject) => {
                if (!file.dir) {
                    file.async("blob").then((image: Blob) => {
                        dispatch(<UploadImage> {
                            image: new File([image], path),
                            type: "uploadImage",
                        });
                    });
                }
            };
            zip.folder("images").forEach(uploadImage);
            zip.folder("keyboard-icons").forEach(uploadImage);
        });
    };
}

export interface FileChangedAction {
    type: "import-file-changed";
    file: File;
}
