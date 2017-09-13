import * as BaseActions from "actions/BaseEditActions";
import { EditableCallbacks, EditableProps} from "core/EditableProps";
import { connect } from "react-redux";
import {Store} from "stores";

type MappedProps<TProps extends EditableProps<any>> = TProps & EditableProps<TProps["value"]>;

type EditableComponentProps = EditableProps<any> & EditableCallbacks<any>;

type RequiredProps = {itemId: number};

function mapStateToProps <TProps extends EditableComponentProps>(state: Store, {itemId}: RequiredProps): MappedProps<TProps> {
    return state.document[itemId] as TProps;
};

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

export default function connectEditable<TProps extends EditableComponentProps>(Component: React.SFC<TProps> | React.ComponentClass<TProps>) {
    return connect(mapStateToProps, mapBaseActionsToProps)(Component);
}
