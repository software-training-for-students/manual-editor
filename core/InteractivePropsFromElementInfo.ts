import {EditableProps} from "core/connectEditable";

interface EditableCallbacks<T> {
    setIsEditing: (id: number, mode: boolean) => void;
    onEdited: (id: number, newValue: T) => void;
}

type InteractivePropsFromElementInfo<TElement extends {value: any}> =
    TElement & EditableProps<TElement["value"]> & EditableCallbacks<TElement["value"]>;

export default InteractivePropsFromElementInfo;
