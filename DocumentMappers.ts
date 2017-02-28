import { EditableProps, InteractiveEditableProps, EditableActionsMap } from 'EditableBase';
import * as BaseActions from "actions/BaseEditActions";
import { Document } from 'stores/Document';
import {Store, initialState} from "stores";

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

    return (state : Store = initialState, oldProps : TProps) : Partial<TProps> => {
        const itemState = state.document[oldProps.itemId] as TProps;
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