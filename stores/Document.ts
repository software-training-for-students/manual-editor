import EditableProps from "core/EditableProps";
import ElementInfo, {isMetaElement, isLegacyContentElement} from "core/ElementInfo";
import {isMetaItemOrdering, ItemOrdering} from "core/ItemTree";
import {convertToRaw, EditorState} from "draft-js";

export interface Document {
    [itemId: number]: EditableProps<any> & {[k: string]: any};
    nextItemId: number;
    elementOrdering: ItemOrdering[];
}

export let initialState: Document = {
    1 : {
        editing : false,
        itemId : 1,
        level : 1,
        value : "Empty Manual Template",
    },
    2 : {
        editing : false,
        itemId : 2,
        level : 2,
        value : "Small Tagline Description Here",
    },
    3: {
        editing: false,
        itemId: 3,
        level: 1,
        value: "Introduction",
    },
    4: {
        editing: false,
        itemId: 4,
        value: convertToRaw(EditorState.createEmpty().getCurrentContent()),
    },
    elementOrdering : [
        {
            elementType: "Heading",
            itemId: 3,
        },
        {
            elementType: "RichText",
            itemId: 4,
        },
    ],
    nextItemId : 5,
};

function exitEditModes(document: Document) {
    for (let i = 0; i < document.nextItemId ; ++i) {
        if (document[i]) {
            document[i].editing = false;
        }
    }
}

function findLocation(
    document: Document,
    relativeLocation: "before" | "after" | "end") {
    let location: number;

    if (relativeLocation !== "end") {
        let activeItemId: number = -1;
        for (let i = 0; i < document.nextItemId ; ++i) {
            if (document[i] && document[i].editing) {
                activeItemId = i;
                break;
            }
        }

        let orderIndex: number = document.elementOrdering.length - 1;

        for (let i = 0; i < document.elementOrdering.length ; ++i) {
            if (document.elementOrdering[i].itemId === activeItemId) {
                orderIndex = i;
                break;
            }
        }
        location = orderIndex;
        if (relativeLocation === "after") {
            ++location;
        }
    } else {
        location = document.elementOrdering.length;
    }
    return location;
}

export function addElements(
    document: Document,
    elements: ElementInfo[],
    supportLegacyElements: boolean,
    elementToEdit: number = 0,
    relativeLocation: "before" | "after" | "end" = "end") {

    let location = findLocation(document, relativeLocation);
    exitEditModes(document);

    let orderings: ItemOrdering[] = [];
    let idStack: number[] = [];
    elements.forEach((element, idx) => {

        let metaItemType = isMetaElement(element) ? element.metaItemType : undefined;
        let itemId = metaItemType === "close" ? idStack.pop()! : document.nextItemId;

        if (!isMetaElement(element)) {
            document[itemId] = {... element.elementState, editing : idx === elementToEdit, itemId};
        }

        if (metaItemType === "open") {
            idStack.push(itemId);
        }

        document.nextItemId++;
        if (isMetaElement(element)) {
            orderings.push({itemId, elementType: element.elementType, metaItemType: element.metaItemType});
        } else if (isLegacyContentElement(element)) {
            if (supportLegacyElements) {
                orderings.push({itemId, elementType: element.elementType});
            } else {
                throw new Error(`You cannot add a ${element.elementType} element to this document.`);
            }
        } else {
            orderings.push({itemId, elementType: element.elementType});
        }
    });

    let docOrdering = document.elementOrdering.slice();
    Array.prototype.splice.apply(docOrdering, (<any[]> [location, 0]).concat(orderings));
    document.elementOrdering = docOrdering;
}

export function removeElement(document: Document, itemId: number) {
    delete document[itemId];
    let elementOrdering: ItemOrdering[] = [];
    let deletingRange: boolean = false;
    document.elementOrdering.forEach((element) => {
        if (element.itemId !== itemId && !deletingRange) {
            elementOrdering.push(element);
        }
        if (element.itemId === itemId) {
            deletingRange = isMetaItemOrdering(element) && element.metaItemType === "open";
        }
    });
    document.elementOrdering = elementOrdering;
}
