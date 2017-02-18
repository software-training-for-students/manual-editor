import * as React from "react";
import * as Redux from "react-redux";
import {InteractiveEditable, DocumentView} from "../DocumentStore";

interface Props {
    editing? : boolean;
    text? : string;
    inputProps? : any;
    staticProps? : any;
    inputComponentClass : string | React.StatelessComponent<any> | React.ComponentClass<any>;
    staticComponentClass : string | React.StatelessComponent<any> | React.ComponentClass<any>;
    toggleIsEditing : () => void;
    updateText : (text : string) => void;
}

const EditableText : React.StatelessComponent<Props> = (props : Props) => {
    const toggleIsEditing = () => props.toggleIsEditing();

    const onInputChange = (event : any) => props.updateText(event.target.value);

    if(props.editing) {
        var InputComponent = props.inputComponentClass;
        return <InputComponent
            autoFocus
            onBlur = {toggleIsEditing}
            onChange = {onInputChange}
            value = {props.text || ""}
            {... props.inputProps}
        />
    }
    else {
        var StaticComponent = props.staticComponentClass;
        return <StaticComponent
            onClick = {toggleIsEditing}
            value = {props.text}
            {... props.staticProps} />
    }
};

export default EditableText;