import * as React from "react";
import * as Redux from "react-redux";
import * as EditableText from "./EditableText";
import {Document} from "./DocumentStore";

class H1 extends EditableText.Component<EditableText.Props, void> {
    public renderStatic() {
        return <h1 onClick={this.toggleEditMode}>{this.props.text}</h1>
    }

    public renderEditable() {
        return <input onBlur={this.toggleEditMode} onChange={this.updateText}
         className="h1Edit" type="text" size={40} value={this.props.text} />
    }

    private toggleEditMode = () => {
        this.props.setEditMode(this.props.itemId, this.props.editMode);
    }

    private updateText = (event : any) => {
        this.props.onEdited(this.props.itemId, event.target.value);
    }
}

class H2 extends EditableText.Component<EditableText.Props, void> {
    public renderStatic() {
        return <h2 onClick={this.toggleEditMode}>{this.props.text}</h2>
    }

    public renderEditable() {
        return <input onBlur={this.toggleEditMode} onChange={this.updateText}
         className="h2Edit" type="text" size={40} value={this.props.text} />
    }

    private toggleEditMode = () => {
        this.props.setEditMode(this.props.itemId, this.props.editMode);
    }

    private updateText = (event : any) => {
        this.props.onEdited(this.props.itemId, event.target.value);
    }
}

class H3 extends EditableText.Component<EditableText.Props, void> {
    public renderStatic() {
        return <h3 onClick={this.toggleEditMode}>{this.props.text}</h3>
    }

    public renderEditable() {
        return <input className="h3Edit" type="text" size={40} value={this.props.text} />
    }

    private toggleEditMode = () => {
        this.props.setEditMode(this.props.itemId, this.props.editMode);
    }

    private updateText = (event : any) => {
        this.props.onEdited(this.props.itemId, event.target.value);
    }
}

var connectedComponents = {
    H1 : Redux.connect(EditableText.mapStateToProps, EditableText.dispatcherToPropsMap)(H1),
    H2 : Redux.connect(EditableText.mapStateToProps, EditableText.dispatcherToPropsMap)(H2),
    H3 : Redux.connect(EditableText.mapStateToProps, EditableText.dispatcherToPropsMap)(H3)
};

export default connectedComponents;