import * as BaseActions from './actions/BaseActions';

export interface EditableProps<T> {
    itemId : number;
    editing? : boolean;
    value? : T;
}

export interface InteractiveEditable<T> extends EditableProps<T> {
    setIsEditing?: (id:number, mode : boolean) => void;
    onEdited?: (id:number, newValue : T) => void;
}

// Redux mapping and reducing functions can use this interface to get strongly typed data.
export interface DocumentView<TProps extends EditableProps<any>> {
    [itemId : number] : TProps;
}

export interface Document extends DocumentView<EditableProps<any>> {}

export var initialState : Document = {
    1 : {
        itemId : 1,
        value : "Empty Manual Template",
        editing : false
    },
    2 : {
        itemId : 2,
        value : "Small Tagline Description Here",
        editing : false
    }
}


export function mapBaseStateToProps<TProps extends EditableProps<any>>(state : Document = initialState, oldProps : TProps) {
    if(state === undefined)
        return oldProps;
    const itemState = state[oldProps.itemId];
    if(itemState) {
        const updatedProps : Partial<EditableProps<any>> = {
            editing : itemState.editing,
            value : itemState.value
        }
        return updatedProps;
    }
    return oldProps;
}

export const mapBaseActionsToProps = {
    setIsEditing : (id : number, isEditing : boolean) => (<BaseActions.SetIsEditing>{
        type : "setIsEditing",
        editing : isEditing,
        itemId : id
    }),
    onEdited: (id : number, newValue : any) => (<BaseActions.OnEdited>{
        type : "edited",
        value : newValue,
        itemId : id
    })
};
