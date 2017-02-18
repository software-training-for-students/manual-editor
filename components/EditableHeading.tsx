import * as React from "react";
import * as ReactRedux from "react-redux";
import EditableText from "./EditableText";
import SingleLineEditor from "./SingleLineEditor";
import * as Heading from "./Heading";
import {EditableProps, InteractiveEditable, createEditableStateToPropsMapper, mapBaseActionsToProps} from "../DocumentStore";
import {connect} from "react-redux";

interface Props extends InteractiveEditable<string> {
    level : 1 | 2 | 3 | 4 | 5 | 6;
}

const EditableHeading : React.StatelessComponent<Props> = (props : Props) => {
    var headingProps : Heading.Props = {
        level : props.level,
        value : props.value
    };

    const toggleIsEditing = () => props.setIsEditing !== undefined ? props.setIsEditing(props.itemId, !props.editing) : void 0;
    const updateText = (text : string) => props.onEdited !== undefined ? props.onEdited(props.itemId, text) : void 0;

    return <EditableText editing = {props.editing === undefined ? false : props.editing}
        inputComponentClass = {SingleLineEditor} 
        staticComponentClass={Heading.Component}
        staticProps = {headingProps}
        text={props.value === undefined ? "" : props.value}
        toggleIsEditing = {toggleIsEditing}
        updateText = {updateText} />
}

function mapHeadingStateToProps(itemState : Props, updatedBaseProps: Partial<EditableProps<any>>) {
    return {
        ... updatedBaseProps,
        level : itemState.level
    }
}

export default connect(createEditableStateToPropsMapper(mapHeadingStateToProps), mapBaseActionsToProps)(EditableHeading);
