
export interface EditableProps<T> {
    itemId: number;
    editing?: boolean;
    value?: T;
}

interface EditableCallbacks<T> {
    setIsEditing?: (id: number, mode: boolean) => void;
    onEdited?: (id: number, newValue: T) => void;
}

export type EditableActionsMap<T> = {
    [P in keyof EditableCallbacks<T>] : (id: number, ...args: any[] ) => {
        type: P,
        itemId: number,
    };
};

export interface InteractiveEditableProps<T> extends EditableProps<T>, EditableCallbacks<T> {
}

export function getCommonInteractiveEditableProps<T>(props: InteractiveEditableProps<T>) {
    const toggleIsEditing = () => props.setIsEditing !== undefined ? props.setIsEditing(props.itemId, !props.editing) : void 0;
    const updateValue = (value: T) => props.onEdited !== undefined ? props.onEdited(props.itemId, value) : void 0;
    return {
        toggleIsEditing,
        updateValue,
    };
}
