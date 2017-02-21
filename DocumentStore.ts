import { EditableProps, EditableActionsMap, InteractiveEditableProps } from './EditableBase';
import * as BaseActions from './actions/BaseActions';

export interface ItemOrdering {
        itemId: number;
        elementType : string;
}

// Redux mapping and reducing functions can use this interface to get strongly typed data.
export interface DocumentView<TProps extends EditableProps<any>> {
    [itemId : number] : TProps;
    nextItemId : number;
    elementOrdering : ItemOrdering[];
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
    },
    4 : {
        itemId : 4,
        editing : false,
        value : "Test Header",
        level : 1
    },
    nextItemId : 4,
    elementOrdering : [
        {itemId: 3, elementType: "SingleImage"},
        {itemId: 4, elementType: "Heading"}
        ]
}

function mapItemStateToDefaultProps(state : EditableProps<any>) : Partial<EditableProps<any>> {
    return {
        editing : state.editing,
        value : state.value
    };
}

function mapItemStateToAdditionalPropsDefault<TProps extends EditableProps<any>>(itemState : any, updatedBaseProps: Partial<EditableProps<any>>) : Partial<TProps> {
    return {... itemState, ... updatedBaseProps}
}

export function createEditableStateToPropsMapper<TProps extends EditableProps<any>>(
    mapItemStateToAdditionalProps : (itemState : TProps, updatedBaseProps: Partial<EditableProps<any>>) => Partial<TProps>
     = mapItemStateToAdditionalPropsDefault) {
    
    return (state : Document = initialState, oldProps : TProps) : Partial<TProps> => {
        const itemState = state[oldProps.itemId] as TProps;
        if(itemState) {
            const updatedBaseProps = mapItemStateToDefaultProps(itemState);
            return mapItemStateToAdditionalProps(itemState, updatedBaseProps);
        }
        return oldProps;
    };
}

export const mapBaseActionsToProps : EditableActionsMap<InteractiveEditableProps<any>> = {
    setIsEditing : (id : number, isEditing : boolean) => (<BaseActions.SetIsEditing>{
        type : "setIsEditing",
        editing : isEditing,
        itemId : id
    }),
    onEdited: (id : number, newValue : any) => (<BaseActions.OnEdited>{
        type : "onEdited",
        value : newValue,
        itemId : id
    })
};
