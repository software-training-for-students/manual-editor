import EditableContent from "components/EditableContent";
import * as React from "react";

type ComponentType<TProps> = React.StatelessComponent<TProps> | React.ComponentClass<TProps>;

type InputProps<TElementValue> = {
    value: TElementValue;
    autoFocus?: boolean;
    onValueChange: (value: TElementValue) => void;
};

type Props<TElementInfo extends {value: any}> = TElementInfo & {
    itemId: number;
    editing: boolean;
    inputProps?: any;
    staticProps?: any;
    inputComponentClass: ComponentType<InputProps<TElementInfo["value"]>>;
    staticComponentClass: ComponentType<TElementInfo>;
    setIsEditing: (id: number, mode: boolean) => void;
    onEdited: (id: number, newValue: TElementInfo["value"]) => void;
};

export default class EditableElement<TElementInfo extends {value: any}> extends React.Component<Props<TElementInfo>, {}> {
    public render() {
        const Content: new(...args: any[]) => EditableContent<TElementInfo["value"]> = EditableContent;
        return <Content {...this.props} toggleIsEditing={this.toggleIsEditing} updateValue={this.updateValue} />;
    }

    private toggleIsEditing = () => {
        this.props.setIsEditing(this.props.itemId, !this.props.editing);
    }

    private updateValue = (value: TElementInfo["value"]) => {
        this.props.onEdited(this.props.itemId, value);
    }
}
