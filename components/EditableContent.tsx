import * as React from "react";

interface Props<T> {
    editing : boolean | undefined;
    value : T | undefined;
    inputProps? : any;
    staticProps? : any;
    inputComponentClass : string | React.StatelessComponent<any> | React.ComponentClass<any>;
    staticComponentClass : string | React.StatelessComponent<any> | React.ComponentClass<any>;
    toggleIsEditing : () => void;
    updateValue : (value : T) => void;
}

class EditableContent<T> extends React.Component<Props<T> , void> {
    private toggleIsEditing = () => 
        this.props.toggleIsEditing();

    private onValueChanged = (value : T) =>
     this.props.updateValue(value);

    public render() {
        if(this.props.editing) {
            var InputComponent = this.props.inputComponentClass;
            return <InputComponent
                autoFocus
                onComplete = {this.toggleIsEditing}
                onValueChange = {this.onValueChanged}
                value = {this.props.value}
                {... this.props.inputProps}
            />
        }
        else {
            var StaticComponent = this.props.staticComponentClass;
            return <StaticComponent
                onClick = {this.toggleIsEditing}
                value = {this.props.value}
                {... this.props.staticProps} />
        }
    }
};

export default EditableContent;