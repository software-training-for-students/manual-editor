import * as React from "react";
import * as Redux from "react-redux";
import {Editable, DocumentView, ActionBase} from "./DocumentStore";

export interface Props extends Editable {
    text? : string;
    editMode? : boolean;
    setEditMode?: (id:number, mode : boolean) => void;
    onEdited?: (id:number, newText : string) => void;
}

export interface SetEditModeAction extends ActionBase {
    type : "setEditMode";
    editMode : boolean;
}

export interface OnEditedAction extends ActionBase {
    type : "edited";
    text : string;
}

export abstract class Component<TProps extends Props, TState> extends React.Component<TProps, TState> {
    public abstract renderEditable() : JSX.Element;
    public abstract renderStatic() : JSX.Element;
    
    public render() {
        return this.props.editMode ? this.renderEditable() : this.renderStatic();
    }

    protected toggleEditMode = () => {
        var props : Props = this.props;
        if(props.setEditMode)
            props.setEditMode(props.itemId, props.editMode === undefined ? false : props.editMode);
    }

    protected updateText = (event : any) => {
        var props : Props = this.props;
        if(props.onEdited)
            props.onEdited(props.itemId, event.target.value);
    }
}

export function mapStateToProps(state : DocumentView<Props> | undefined, props : Props) : Partial<Props> {
    if(state === undefined)
        return props;
    return {
        editMode: state[props.itemId] ? state[props.itemId].editMode : props.editMode,
        text : state[props.itemId] ? state[props.itemId].text : props.text
    };
}

export var dispatcherToPropsMap = {
        setEditMode : (id : number, mode : boolean) => ({
            type: "setEditMode",
            editMode: !mode,
            itemId : id
        } as SetEditModeAction),
        onEdited : (id : number, newText : string) => ({
            type : "edited",
            text : newText,
            itemId : id
        } as OnEditedAction)
    };