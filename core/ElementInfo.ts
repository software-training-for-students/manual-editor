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

export interface ListItem {
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

type MetaItemType = "open" | "close";

export type MetaElement = "Table" | "TableRow" | "TableHeader" | "TableCell" | "UnorderedList" | "OrderedList" | "InstructionList";

type ElementInfo = {
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
    elementState: ListItem;
} | {
    elementType: "SidebarNote";
    elementState: SidebarNote;
} | {
    elementType: "Toolbox";
    elementState: Toolbox;
} | {
    metaItemType: MetaItemType;
    elementType: MetaElement;
};

export default ElementInfo;
