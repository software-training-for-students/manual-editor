import {ContentElementType, isMetaElementType, MetaElementType, MetaItemType} from "core/ElementInfo";

type MetaItemOrdering = {
    itemId: number;
    elementType: MetaElementType;
    metaItemType: MetaItemType;
};

export type ItemOrdering = {
    itemId: number;
} & (
    MetaItemOrdering | {
        elementType: ContentElementType;
    }
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

export function isMetaItemOrdering(ordering: ItemOrdering): ordering is MetaItemOrdering {
    return isMetaElementType(ordering.elementType);
}

export function isItemTreeLeaf(tree: ItemTree): tree is ItemLeaf {
    return !isMetaElementType(tree.elementType);
}
