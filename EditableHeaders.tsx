import * as React from "react";
import * as Redux from "react-redux";
import * as EditableText from "./EditableText";
import {Document} from "./DocumentStore";

abstract class HeadingBase extends EditableText.Component<EditableText.Props, void> {
    protected toggleEditMode = () => {
        if(this.props.setEditMode)
            this.props.setEditMode(this.props.itemId, this.props.editMode || false);
    }

    protected updateText = (event : any) => {
        if(this.props.onEdited)
            this.props.onEdited(this.props.itemId, event.target.value);
    }

    private componentDidUpdate() {
        var input = this.refs["editor"] as HTMLElement;
        if(input) {
            input.focus();
        }
    }
}

class H1 extends HeadingBase {
    public renderStatic() {
        return <h1 onClick={this.toggleEditMode}>{this.props.text}</h1>
    }

    public renderEditable() {
        return <input ref="editor" onBlur={this.toggleEditMode} onChange={this.updateText}
         className="h1Edit" type="text" size={40} value={this.props.text} />
    }
}

class H2 extends HeadingBase {
    public renderStatic() {
        return <h2 onClick={this.toggleEditMode}>{this.props.text}</h2>
    }

    public renderEditable() {
        return <input ref="editor" onBlur={this.toggleEditMode} onChange={this.updateText}
         className="h2Edit" type="text" size={40} value={this.props.text} />
    }
}

class H3 extends HeadingBase {
    public renderStatic() {
        return <h3 onClick={this.toggleEditMode}>{this.props.text}</h3>
    }

    public renderEditable() {
        return <input ref="editor" onBlur={this.toggleEditMode} onChange={this.updateText}
         className="h3Edit" type="text" size={40} value={this.props.text} />
    }
}

var connectedComponents = {
    H1 : Redux.connect(EditableText.mapStateToProps, EditableText.dispatcherToPropsMap)(H1),
    H2 : Redux.connect(EditableText.mapStateToProps, EditableText.dispatcherToPropsMap)(H2),
    H3 : Redux.connect(EditableText.mapStateToProps, EditableText.dispatcherToPropsMap)(H3)
};

export default connectedComponents;