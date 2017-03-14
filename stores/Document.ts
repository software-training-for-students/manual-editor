import { EditableProps } from "core/EditableBase";

export interface ItemOrdering {
        itemId: number;
        elementType: string;
}

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

export function addElementToEndOfDocument(document: Document, elementType: string, elementState: EditableProps<any>) {
    exitEditModes(document);
    let itemId = document.nextItemId;
    document[itemId] = {... elementState, editing : true};
    document.nextItemId++;
    document.elementOrdering.push({itemId, elementType});
}

export function addElementRelativeToCurrentlyActiveElement(
    document: Document,
    elementType: string,
    elementState: EditableProps<any>,
    relativeLocation: "before" | "after") {
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

    exitEditModes(document);
    let itemId = document.nextItemId;
    document[itemId] = {... elementState, editing : true};
    document.nextItemId++;
    if (relativeLocation === "before") {
        document.elementOrdering.splice(orderIndex, 0, {itemId, elementType});
    } else if (relativeLocation === "after") {
        document.elementOrdering.splice(orderIndex + 1, 0, {itemId, elementType});
    } else {
        throw new Error("Invalid ordering");
    }

}
