import * as BaseActions from "actions/BaseEditActions";
import {initialState, Store} from "stores";
import { EditableActionsMap, EditableProps, InteractiveEditableProps } from "./EditableBase";

function mapItemStateToDefaultProps(state: EditableProps<any>): Partial<EditableProps<any>> {
    return {
        editing : state.editing,
        value : state.value,
    };
}

function mapItemStateToAdditionalPropsDefault<TProps extends EditableProps<any>>(itemState: any, updatedBaseProps: Partial<EditableProps<any>>):
 Partial<TProps> {
    return {... itemState, ... updatedBaseProps};
}

type OldProps<TProps> = Partial<TProps> & {itemId: number};

export function createEditableStateToPropsMapper<TProps extends EditableProps<any>>(
    mapItemStateToAdditionalProps: (itemState: TProps, updatedBaseProps: Partial<EditableProps<any>>) => Partial<TProps>
     = mapItemStateToAdditionalPropsDefault) {

    return (state: Store = initialState, oldProps: OldProps<TProps>) : Partial<TProps> => {
        let itemId: number = oldProps.itemId;
        const itemState = state.document[itemId] as TProps;
        if (itemState) {
            const updatedBaseProps = mapItemStateToDefaultProps(itemState);
            return mapItemStateToAdditionalProps(itemState, updatedBaseProps);
        }
        return oldProps;
    };
}

export const mapBaseActionsToProps: EditableActionsMap<InteractiveEditableProps<any>> = {
    onEdited: (id: number, newValue: any) => (<BaseActions.OnEdited> {
        itemId : id,
        type : "onEdited",
        value : newValue,
    }),
    setIsEditing : (id: number, isEditing: boolean) => (<BaseActions.SetIsEditing> {
        editing : isEditing,
        itemId : id,
        type : "setIsEditing",
    }),
};
