import * as BaseActions from "actions/BaseEditActions";
import { EditableCallbacks, EditableProps} from "core/EditableProps";
import { connect } from "react-redux";
import {Omit} from "react-redux";
import {Store} from "stores";

type MappedProps<TProps extends EditableProps<any>> = Partial<TProps> & EditableProps<TProps["value"]>;

type EditableComponentProps = EditableProps<any> & EditableCallbacks<any>;

type RequiredProps<TProps extends EditableComponentProps> = Omit<TProps, keyof EditableComponentProps> & {itemId: number};

// This needs to be this function-returning-function setup. Otherwise the type inference happens too early
// and TProps ends up being EditableComponentProps (and only the "value" member is passed along as a prop).
function createEditableStateToPropsMapper<TProps extends EditableComponentProps>() {
    return (state: Store, {itemId}: RequiredProps<TProps>) : MappedProps<TProps> => {
        return state.document[itemId] as TProps;
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

export default connect(createEditableStateToPropsMapper(), mapBaseActionsToProps);
