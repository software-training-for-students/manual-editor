import * as BaseActions from './actions/BaseActions';

export interface EditableProps<T> {
    itemId : number;
    editing? : boolean;
    value? : T;
}

export interface InteractiveEditableProps<T> extends EditableProps<T> {
    setIsEditing?: (id:number, mode : boolean) => void;
    onEdited?: (id:number, newValue : T) => void;
}

// Redux mapping and reducing functions can use this interface to get strongly typed data.
export interface DocumentView<TProps extends EditableProps<any>> {
    [itemId : number] : TProps;
}

export interface Document extends DocumentView<EditableProps<any> & any> {}

export var initialState : Document = {
    1 : {
        itemId : 1,
        value : "Empty Manual Template",
        editing : false,
        level : 1
    },
    2 : {
        itemId : 2,
        value : "Small Tagline Description Here",
        editing : false,
        level : 2
    },
    3 : {
        itemId : 3,
        editing : false,
        value : {
            source : "http://software-training-for-students.github.io/manual-master-files/sts-services.png",
            caption : "Caption",
            border : false,
            className : "centered-image-large"
        }
    }
}

function mapItemStateToDefaultProps(state : EditableProps<any>) : Partial<EditableProps<any>> {
    return {
        editing : state.editing,
        value : state.value
    };
}

export function createEditableStateToPropsMapper<TProps extends EditableProps<any>>(
    mapItemStateToAdditionalProps : (itemState : TProps, updatedBaseProps: Partial<EditableProps<any>>) => Partial<TProps>) {
    
    return (state : Document = initialState, oldProps : TProps) : Partial<TProps> => {
        const itemState = state[oldProps.itemId] as TProps;
        if(itemState) {
            const updatedBaseProps = mapItemStateToDefaultProps(itemState);
            return mapItemStateToAdditionalProps(itemState, updatedBaseProps);
        }
        return oldProps;
    };
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
