import {EditableProps, EditableCallbacks} from "core/EditableProps";

type InteractivePropsFromElementInfo<TElement extends {value: any}> =
    TElement & EditableProps<TElement["value"]> & EditableCallbacks<TElement["value"]>;

export default InteractivePropsFromElementInfo;
