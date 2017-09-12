import { EditableProps } from "core/EditableProps";
import { KeyboardShortcut, SidebarNote } from "core/ElementInfo";
import KeyToImageMap from "core/KeyToImageMap";
import * as Draft from "draft-js";
import { Document } from "stores/Document";

export const saveVersion: number = 2;

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
    [1] : (document: Document) => {
        let newDocument = {... document};
        newDocument.elementOrdering = document.elementOrdering.slice();
        for (let i = 0; i < newDocument.elementOrdering.length; ++i) {
            let element = newDocument.elementOrdering[i];
            if (element.elementType === "KeyboardShortcut") {
                let elementInfo = newDocument[element.itemId] as KeyboardShortcut;
                newDocument.elementOrdering[i] = {... element, elementType: "SidebarNote"};
                let sidebarNote: EditableProps<SidebarNote["value"]> = {
                    itemId: element.itemId,
                    editing: false,
                    value: {
                        title: elementInfo.value.title,
                        content: convertKeyboardShortcutToDraftContent(elementInfo.value),
                    },
                };
                newDocument[element.itemId] = sidebarNote;
            }
        }
        return {
            document: newDocument,
            newSaveVersion: 2,
        };
    },
};

function convertKeyboardShortcutToDraftContent(shortcut: KeyboardShortcut["value"]): Draft.RawDraftContentState {
    switch (shortcut.type) {
        case "no-shortcut":
            return shortcut.content;
        case "shortcut":
            shortcut.content.blocks.push(generateShortcutContentBlock("Press ", shortcut, 0));
            return shortcut.content;
        case "multi-shortcut":
            shortcut.content.blocks.push(generateShortcutContentBlock("On Mac, press ", shortcut, 0));
            shortcut.content.blocks.push(generateShortcutContentBlock("On Windows, press ", shortcut, 0));
            return shortcut.content;
        default:
            return shortcut.content;
    }
}

function generateShortcutContentBlock(startString: string, shortcut: KeyboardShortcut["value"], shortcutIdx: number): Draft.RawDraftContentState["blocks"][0] {
    let entityRanges = [];
    let nextEntityKey = Math.max(... Object.getOwnPropertyNames(shortcut.content.entityMap).map((entityKey) => parseInt(entityKey, 10)));
    for (let key of shortcut.shortcuts[shortcutIdx]) {
        let keyString = KeyToImageMap[key];
        let range = {
            offset: startString.length,
            length: keyString.length,
            key: nextEntityKey++,
        };
        startString += keyString + "+";
        entityRanges.push(range);
    }
    for (let entity of entityRanges) {
        shortcut.content.entityMap[entity.key.toString()] = {
            type: "KBD",
            mutability: "IMMUTABLE",
            data: {},
        };
    }
    startString = startString.substr(0, startString.length - 1);
    return {
        key: Draft.genKey(),
        type: "unstyled",
        depth: 0,
        data: {},
        inlineStyleRanges: [],
        text: startString,
        entityRanges,
    };
}
