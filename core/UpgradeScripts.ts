import { KeyboardShortcut } from "core/ElementInfo";

import { Document } from "stores/Document";

export const saveVersion: number = 1;

export function upgradeDocument(document: Document, currentSaveVersion: number) {
    let upgradedDocument = document;
    while (currentSaveVersion !== saveVersion) {
        if (!upgradeScripts[currentSaveVersion]) {
            console.warn(`Unable to upgrade from version ${currentSaveVersion} to ${saveVersion} automatically. Could not find an upgrade script.`);
        }
        let result = upgradeScripts[currentSaveVersion](upgradedDocument);
        upgradedDocument = result.document;
        currentSaveVersion = result.newSaveVersion;
    }
    return upgradedDocument;
}

const upgradeScripts: {
    [currentSaveVersion: number]: (document: Document) => {
        document: Document,
        newSaveVersion: number,
    },
} = {

};
