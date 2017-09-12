import {ContentElementType, isLegacyContentElementType, isMetaElementType, LegacyContentElementType, MetaElementType, MetaItemType} from "core/ElementInfo";

type MetaItemOrdering = {
    itemId: number;
    elementType: MetaElementType;
    metaItemType: MetaItemType;
};

type LegacyItemOrdering = {
    itemId: number;
    elementType: LegacyContentElementType;
};

export type ItemOrdering = {
    itemId: number;
} & (
    MetaItemOrdering | {
        elementType: ContentElementType;
    } | LegacyItemOrdering
);

type ItemLeaf = {
    itemId: number;
    elementType: ContentElementType;
};

export type ItemTree = ItemLeaf | {
    itemId: number;
    elementType: MetaElementType;
    items: ItemTree[];
};

export function isLegacyItemOrdering(ordering: ItemOrdering): ordering is LegacyItemOrdering {
    return isLegacyContentElementType(ordering.elementType);
}

export function isMetaItemOrdering(ordering: ItemOrdering): ordering is MetaItemOrdering {
    return isMetaElementType(ordering.elementType);
}

export function isItemTreeLeaf(tree: ItemTree): tree is ItemLeaf {
    return !isMetaElementType(tree.elementType);
}
