import importManualHtml from "core/importManualHtml";
import * as JSZip from "jszip";
import { Action } from "redux";
import {closeDialog} from "redux-dialog-extended";
import {ThunkAction} from "redux-thunk";
import {Store} from "stores";
import {UploadImage} from "./ImageActions";
import {ClearImagesAction, SetDocumentAction} from "./SaveLoadActions";

export default function(legacyFile: File): ThunkAction<void, Store, void> {
    return async (dispatch) => {
        dispatch(<SetImportingAction> {
            importing: true,
            type: "set-import",
        });
        let legacyZip = new JSZip();
        legacyZip = await legacyZip.loadAsync(legacyFile);
        legacyZip = legacyZip.folder(legacyFile.name.substr(0, legacyFile.name.length - ".zip".length));

        dispatch(<SetDocumentAction> {
            document: importManualHtml(await legacyZip.file("manual.html").async("text")),
            type: "set-document",
        });
        dispatch(<ClearImagesAction> {
            type: "clear-images",
        });

        let promises: Array<Promise<any>> = [];
        const uploadImage = (path: string, file: JSZipObject) => {
            if (!file.dir) {
                promises.push(file.async("blob").then((image: Blob) => {
                    dispatch(<UploadImage> {
                        image: new File([image], path.toLowerCase()),
                        type: "uploadImage",
                    });
                }));
            }
        };
        legacyZip.folder("images").forEach(uploadImage);
        legacyZip.folder("keyboard-icons").forEach(uploadImage);
        await Promise.all(promises);

        dispatch(<FileChangedAction> {
            file: undefined,
            type: "import-file-changed",
        });
        dispatch(<SetImportingAction> {
            importing: false,
            type: "set-import",
        });
        dispatch(closeDialog("import-wizard"));
    };
}

export interface FileChangedAction {
    type: "import-file-changed";
    file?: File;
}

export function isFileChanged(action: Action): action is FileChangedAction {
    return action.type === "import-file-changed";
}

export interface SetImportingAction {
    type: "set-import";
    importing: boolean;
}

export function isSetImporting(action: Action): action is SetImportingAction {
    return action.type === "set-import";
}
