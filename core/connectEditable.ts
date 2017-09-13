import * as BaseActions from "actions/BaseEditActions";
import { EditableCallbacks, EditableProps} from "core/EditableProps";
import { connect } from "react-redux";
import {Omit} from "react-redux";
import {initialState, Store} from "stores";

function mapItemStateToDefaultProps<T>(state: EditableProps<T>): EditableProps<T> {
    return {... state};
}

type MappedProps<TProps extends EditableProps<any>> = Partial<TProps> & EditableProps<TProps["value"]>;

type EditableComponentProps = EditableProps<any> & EditableCallbacks<any>;

type RequiredProps<TProps extends EditableComponentProps> = Omit<TProps, keyof EditableComponentProps> & {itemId: number};

function mapItemStateToAdditionalPropsDefault<TProps extends EditableProps<any>>(itemState: any, updatedBaseProps: EditableProps<TProps["value"]>):
 MappedProps<TProps> {
    return {... itemState, ... updatedBaseProps};
}

function createEditableStateToPropsMapper<TProps extends EditableComponentProps>(
    mapItemStateToAdditionalProps: (itemState: TProps, updatedBaseProps: EditableProps<any>) => MappedProps<TProps>) {

    return (state: Store = initialState, {itemId}: RequiredProps<TProps>) : MappedProps<TProps> => {
        const itemState = state.document[itemId] as TProps;
        const updatedBaseProps = mapItemStateToDefaultProps(itemState);
        return mapItemStateToAdditionalProps(itemState, updatedBaseProps);
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

export default function connectEditable<TProps extends EditableComponentProps>(
    mapItemStateToProps: (itemState: TProps, updateBaseProps: EditableProps<TProps["value"]>) => MappedProps<TProps>
        = mapItemStateToAdditionalPropsDefault) {
    return connect(createEditableStateToPropsMapper(mapItemStateToProps), mapBaseActionsToProps);
}
