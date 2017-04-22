import { EditableProps } from "core/EditableBase";

type MetaItemType = "open" | "close";

export interface ItemOrdering {
        itemId: number;
        elementType: string;
        metaItemType?: MetaItemType;
}

export interface ItemTree extends ItemOrdering {
    items: ItemTree[];
}

export interface Document {
    [itemId: number]: EditableProps<any> & {[k: string]: any};
    nextItemId: number;
    elementOrdering: ItemOrdering[];
}

export interface ElementInfo {
    elementType: string;
    elementState?: {
        value: any,
        [key: string]: any,
    };
    metaItemType?: MetaItemType;
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
    elementOrdering : [],
    nextItemId : 3,
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
    elementToEdit: number = 0,
    relativeLocation: "before" | "after" | "end" = "end") {

    let location = findLocation(document, relativeLocation);
    exitEditModes(document);

    let orderings: ItemOrdering[] = [];
    let idStack: number[] = [];
    elements.forEach((element, idx) => {
        let itemId = element.metaItemType === "close" ? idStack.pop()! : document.nextItemId;
        document[itemId] = {... element.elementState, editing : idx === elementToEdit, itemId};
        if (element.metaItemType === "open") {
            idStack.push(itemId);
        }
        document.nextItemId++;
        orderings.push({itemId, elementType: element.elementType, metaItemType: element.metaItemType});
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
            deletingRange = element.metaItemType === "open";
        }
    });
    document.elementOrdering = elementOrdering;
}
