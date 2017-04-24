import importManualHtml from "core/importManualHtml";
import * as JSZip from "jszip";
import {closeDialog} from "redux-dialog";
import {ThunkAction} from "redux-thunk";
import {Store} from "stores";
import {UploadImage} from "./ImageActions";
import {ClearImagesAction, SetDocumentAction} from "./SaveLoadActions";

export default function(legacyFile: File): ThunkAction<void, Store, void> {
    return (dispatch) => {
        dispatch(<SetImportingAction> {
            importing: true,
            type: "set-import",
        });
        let legacyZip = new JSZip();
        let promises: Array<Promise<any>> = [];
        legacyZip.loadAsync(legacyFile).then((zip) => {
            zip = zip.folder(legacyFile.name.substr(0, legacyFile.name.length - ".zip".length));
            promises.push(zip.file("manual.html").async("string").then((html) => {
                let newManual = importManualHtml(html);
                dispatch(<SetDocumentAction> {
                    document: newManual,
                    type: "set-document",
                });
            }));

            dispatch(<ClearImagesAction> {
                type: "clear-images",
            });

            const uploadImage = (path: string, file: JSZipObject) => {
                if (!file.dir) {
                    promises.push(file.async("blob").then((image: Blob) => {
                        dispatch(<UploadImage> {
                            image: new File([image], path),
                            type: "uploadImage",
                        });
                    }));
                }
            };
            zip.folder("images").forEach(uploadImage);
            zip.folder("keyboard-icons").forEach(uploadImage);
            Promise.all(promises).then(() => {
                dispatch(<FileChangedAction> {
                    file: undefined,
                    type: "import-file-changed",
                });
                dispatch(<SetImportingAction> {
                    importing: false,
                    type: "set-import",
                });
                dispatch(closeDialog("import-wizard"));
            });
        });
    };
}

export interface FileChangedAction {
    type: "import-file-changed";
    file?: File;
}

export interface SetImportingAction {
    type: "set-import";
    importing: boolean;
}
