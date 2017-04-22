export interface EditableProps<T> {
    itemId: number;
    editing: boolean;
    value: T;
}

interface EditableCallbacks<T> {
    setIsEditing: (id: number, mode: boolean) => void;
    onEdited: (id: number, newValue: T) => void;
}

type InteractiveEditableProps<T> = EditableProps<T> & EditableCallbacks<T>;

export type InteractivePropsFromElementInfo<TElement extends {value: any}> =
    TElement & EditableProps<TElement["value"]> & EditableCallbacks<TElement["value"]>;

export function getCommonInteractiveEditableProps<T>(props: InteractiveEditableProps<T>) {
    const toggleIsEditing = () => props.setIsEditing !== undefined ? props.setIsEditing(props.itemId, !props.editing) : void 0;
    const updateValue = (value: T) => props.onEdited !== undefined ? props.onEdited(props.itemId, value) : void 0;
    return {
        toggleIsEditing,
        updateValue,
    };
}
