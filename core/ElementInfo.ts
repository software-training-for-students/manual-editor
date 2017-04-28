import KeyToImageMap from "core/KeyToImageMap";
import { RawDraftContentState } from "draft-js";

export interface Code {
    language: string;
    value: string;
}

export interface RawHtml {
    value: string;
}

export type SingleImageClassName =
    "centered-image-tiny"
    | "centered-image-small"
    | "centered-image-medium"
    | "centered-image-large"
    | "full-width-image"
    | "side-image-small"
    | "side-image-medium"
    | "side-image-large"
    | "sidebar-icon";

export type SideBySideImageClassName =
    "sidebyside-image-small"
    | "sidebyside-image-large";

export interface SingleImage {
    value: {
        className: SingleImageClassName;
        border?: boolean;
        source: string;
        caption?: string;
    };
}

export interface SideBySideImage {
    value: {
        className: SideBySideImageClassName;
        border?: boolean;
        leftSource: string;
        rightSource: string;
        caption?: string;
    };
}

export interface Heading {
    value: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

export type Keys = keyof typeof KeyToImageMap;

export interface KeyboardShortcut {
    value: {
        title: string;
        content: RawDraftContentState;
        shortcuts: Array<Array<keyof typeof KeyToImageMap>>;
        type: "no-shortcut" | "shortcut" | "multi-shortcut";
    };
}

export interface RichText {
    value: RawDraftContentState;
}

export interface SidebarNote {
    value: {
        title: string;
        content: RawDraftContentState;
        imgSource: string;
    };
}

export interface Toolbox {
    value: Array<{
        imgSrc: string;
        name: string;
        description: string;
    }>;
}

export type MetaItemType = "open" | "close";

// Make the list of meta elements available at runtime.
const metaElements = {
    InstructionList: "InstructionList",
    OrderedList: "OrderedList",
    Table: "Table",
    TableCell: "TableCell",
    TableHeader: "TableHeader",
    TableRow: "TableRow",
    UnorderedList: "UnorderedList",
    // This element type represents the manual as a whole. It is used as the root when building the element tree in Manual.tsx
    Manual: "Manual",
};

export type MetaElementType = keyof typeof metaElements;

 type MetaElementInfo = {
    metaItemType: MetaItemType;
    elementType: MetaElementType;
};

type ContentElementInfo = {
    elementType: "Code";
    elementState: Code;
} | {
    elementType: "RawHtml";
    elementState: RawHtml;
} | {
    elementType: "SingleImage";
    elementState: SingleImage;
} | {
    elementType: "SideBySideImage";
    elementState: SideBySideImage;
} | {
    elementType: "Heading";
    elementState: Heading;
} | {
    elementType: "KeyboardShortcut";
    elementState: KeyboardShortcut;
} | {
    elementType: "RichText";
    elementState: RichText;
} | {
    elementType: "ListItem";
    elementState: RichText;
} | {
    elementType: "SidebarNote";
    elementState: SidebarNote;
} | {
    elementType: "Toolbox";
    elementState: Toolbox;
};

type ElementInfo = ContentElementInfo | MetaElementInfo;

export type ContentElementType = ContentElementInfo["elementType"];

export function isMetaElement(element: ElementInfo): element is MetaElementInfo {
    return isMetaElementType(element.elementType);
}

export function isMetaElementType(elementType: string): elementType is MetaElementType {
    return Object.getOwnPropertyNames(metaElements).find((value) => elementType === value) !== undefined;
}

export default ElementInfo;
