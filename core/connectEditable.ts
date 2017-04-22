import * as BaseActions from "actions/BaseEditActions";
import EditableProps from "core/EditableProps";
import { connect } from "react-redux";
import {initialState, Store} from "stores";

function mapItemStateToDefaultProps(state: EditableProps<any>): EditableProps<any> {
    return {... state};
}

function mapItemStateToAdditionalPropsDefault<TProps extends EditableProps<any>>(itemState: any, updatedBaseProps: Partial<EditableProps<any>>):
 Partial<TProps> {
    return {... itemState, ... updatedBaseProps};
}

type OldProps<TProps> = Partial<TProps> & {itemId: number};

function createEditableStateToPropsMapper<TProps extends EditableProps<any>>(
    mapItemStateToAdditionalProps: (itemState: TProps, updatedBaseProps: EditableProps<any>) => Partial<TProps>) {

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

const mapBaseActionsToProps = {
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

export default function connectEditable<TProps extends EditableProps<any>>(
    mapItemStateToProps: (itemState: TProps, updateBaseProps: Partial<EditableProps<TProps["value"]>>) => Partial<TProps>
        = mapItemStateToAdditionalPropsDefault) {
    return connect(createEditableStateToPropsMapper(mapItemStateToProps), mapBaseActionsToProps);
}
