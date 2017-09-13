import EditableContent from "components/EditableContent";
import connectEditable from "core/connectEditable";
import InteractivePropsFromElementInfo from "core/InteractivePropsFromElementInfo";
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
        let childProps: any = Object.assign({}, this.props, {
            toggleIsEditing: this.toggleIsEditing,
            updateValue: this.updateValue,
        });
        return <Content {...childProps} />;
    }

    private toggleIsEditing = () => {
        this.props.setIsEditing(this.props.itemId, !this.props.editing);
    }

    private updateValue = (value: TElementInfo["value"]) => {
        this.props.onEdited(this.props.itemId, value);
    }
}

function simpleConnectedElementInfoFactory<TElementInfo extends {value: any}>(
    inputComponent: ComponentType<InputProps<TElementInfo["value"]>>,
    staticComponent: ComponentType<TElementInfo>) {
    return (props: InteractivePropsFromElementInfo<TElementInfo>) => {
        return <EditableElement
        {...props}
        inputComponentClass={inputComponent}
        staticComponentClass={staticComponent}
        />;
    };
}

export function createSimpleConnectedElementInfo<TElementInfo extends {value: any}>(
    inputComponent: ComponentType<InputProps<TElementInfo["value"]>>,
    staticComponent: ComponentType<TElementInfo>) {

    return connectEditable(simpleConnectedElementInfoFactory(inputComponent, staticComponent));
}
