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

interface ElementInfo {
    elementType: string;
    elementState: EditableProps<any>;
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

export function addElements(
    document: Document,
    elements: ElementInfo[],
    elementToEdit: number = 0,
    relativeLocation: "before" | "after" | "end" = "end") {
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
        location = document.elementOrdering.length - 1;
    }


    exitEditModes(document);

    let orderings: ItemOrdering[] = [];

    elements.forEach((element, idx) => {
        let itemId = document.nextItemId;
        document[itemId] = {... element.elementState, editing : idx === elementToEdit};
        document.nextItemId++;
        orderings.push({itemId, elementType: element.elementType});
    });

    document.elementOrdering.splice(location, 0, ...orderings);
}
