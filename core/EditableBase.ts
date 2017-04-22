export interface EditableProps<T> {
    itemId: number;
    editing: boolean;
    value: T;
}

interface EditableCallbacks<T> {
    setIsEditing: (id: number, mode: boolean) => void;
    onEdited: (id: number, newValue: T) => void;
}

export type InteractivePropsFromElementInfo<TElement extends {value: any}> =
    TElement & EditableProps<TElement["value"]> & EditableCallbacks<TElement["value"]>;
