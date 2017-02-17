import * as React from "react";
import * as ReactRedux from "react-redux";
import * as EditableText from "./EditableText";

class H1 extends EditableText.Component<EditableText.Props, void> {
    public renderStatic() {
        return <h1 onClick={this.toggleEditMode}>{this.props.text}</h1>
    }

    public renderEditable() {
        return <input autoFocus={true} onBlur={this.toggleEditMode} onChange={this.updateText}
         className="h1Edit" type="text" size={Math.max(20, this.getTextLength()) + 2} value={this.props.text} />
    }
}

class H2 extends EditableText.Component<EditableText.Props, void> {
    public renderStatic() {
        return <h2 onClick={this.toggleEditMode}>{this.props.text}</h2>
    }

    public renderEditable() {
        return <input autoFocus={true} onBlur={this.toggleEditMode} onChange={this.updateText}
         className="h2Edit" type="text" size={Math.max(20, this.getTextLength()) + 2} value={this.props.text} />
    }
}

class H3 extends EditableText.Component<EditableText.Props, void> {
    public renderStatic() {
        return <h3 onClick={this.toggleEditMode}>{this.props.text}</h3>
    }

    public renderEditable() {
        return <input autoFocus={true} onBlur={this.toggleEditMode} onChange={this.updateText}
         className="h3Edit" type="text" size={Math.max(20, this.getTextLength()) + 2} value={this.props.text} />
    }
}

var connectedComponents = {
    H1 : ReactRedux.connect(EditableText.mapStateToProps, EditableText.mapActionsToProps)(H1),
    H2 : ReactRedux.connect(EditableText.mapStateToProps, EditableText.mapActionsToProps)(H2),
    H3 : ReactRedux.connect(EditableText.mapStateToProps, EditableText.mapActionsToProps)(H3)
};

export default connectedComponents;