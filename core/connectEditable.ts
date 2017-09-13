import * as BaseActions from "actions/BaseEditActions";
import { EditableCallbacks, EditableProps} from "core/EditableProps";
import { connect } from "react-redux";
import {Omit} from "react-redux";
import {Store} from "stores";

type MappedProps<TProps extends EditableProps<any>> = Partial<TProps> & EditableProps<TProps["value"]>;

type EditableComponentProps = EditableProps<any> & EditableCallbacks<any>;

type RequiredProps<TProps extends EditableComponentProps> = Omit<TProps, keyof EditableComponentProps> & {itemId: number};

function mapStateToProps <TProps extends EditableComponentProps>(state: Store, {itemId}: RequiredProps<TProps>): MappedProps<TProps> {
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

// We need to do the two-stage mapStateToProps call because we need the generic parameter types to propogate through correctly.
export default function connectEditable<TProps extends EditableComponentProps>(Component: React.SFC<TProps> | React.ComponentClass<TProps>) {
    return connect((store: Store, props: RequiredProps<TProps>) => mapStateToProps(store, props), mapBaseActionsToProps)(Component);
}
