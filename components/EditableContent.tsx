import * as React from "react";
import * as Redux from "react-redux";
import {InteractiveEditableProps, DocumentView} from "../DocumentStore";

interface Props<T> {
    editing? : boolean;
    value? : T;
    inputProps? : any;
    staticProps? : any;
    inputComponentClass : string | React.StatelessComponent<any> | React.ComponentClass<any>;
    staticComponentClass : string | React.StatelessComponent<any> | React.ComponentClass<any>;
    toggleIsEditing : () => void;
    updateValue : (value : T) => void;
}

class EditableContent<T> extends React.Component<Props<T> , void> {
    private toggleIsEditing = () => this.props.toggleIsEditing();

    private onInputChange = (event : any) =>
     this.props.updateValue(event.target.value);

    public render() {
        if(this.props.editing) {
            var InputComponent = this.props.inputComponentClass;
            return <InputComponent
                autoFocus
                onBlur = {this.toggleIsEditing}
                onChange = {this.onInputChange}
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