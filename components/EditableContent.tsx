import * as React from "react";

interface InputProps<T> {
    autoFocus? : boolean;
    onComplete : () => void;
    onValueChange : (value : T) => void;
    value : T | undefined;
}

interface StaticProps<T> {
    value : T | undefined;
    onClick : (event : React.SyntheticEvent<HTMLElement>) => void;
}

interface Props<T> {
    editing : boolean | undefined;
    value : T | undefined;
    inputProps? : any;
    staticProps? : any;
    inputComponentClass : React.StatelessComponent<InputProps<T>> | React.ComponentClass<InputProps<T>>;
    staticComponentClass : string | React.StatelessComponent<StaticProps<T> & any> | React.ComponentClass<StaticProps<T> & any>;
    toggleIsEditing : () => void;
    updateValue : (value : T) => void;
}

class EditableContent<T> extends React.Component<Props<T> , void> {
    private toggleIsEditing = () => 
        this.props.toggleIsEditing();

    private onStaticClicked = (e : React.SyntheticEvent<HTMLElement>) => {
        e.stopPropagation();
        this.toggleIsEditing();
    }

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
                onClick = {this.onStaticClicked}
                value = {this.props.value}
                {... this.props.staticProps} />
        }
    }
};

export default EditableContent;