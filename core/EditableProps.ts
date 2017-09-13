export interface EditableProps<T> {
    itemId: number;
    editing: boolean;
    value: T;
}

export interface EditableCallbacks<T> {
    setIsEditing: (id: number, mode: boolean) => any;
    onEdited: (id: number, newValue: T) => any;
}

export default EditableProps;
