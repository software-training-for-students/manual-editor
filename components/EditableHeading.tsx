import * as React from "react";
import * as ReactRedux from "react-redux";
import EditableContent from "./EditableContent";
import SingleLineEditor from "./SingleLineEditor";
import * as Heading from "./Heading";
import {EditableProps, InteractiveEditableProps, createEditableStateToPropsMapper, mapBaseActionsToProps} from "../DocumentStore";
import {connect} from "react-redux";
import ElementTypes from "../ElementTypes";

interface Props extends InteractiveEditableProps<string> {
    level : 1 | 2 | 3 | 4 | 5 | 6;
}

class EditableText extends EditableContent<string> {}

const EditableHeading : React.StatelessComponent<Props> = (props : Props) => {
    var headingProps : Heading.Props = {
        level : props.level
    };

    const toggleIsEditing = () => props.setIsEditing !== undefined ? props.setIsEditing(props.itemId, !props.editing) : void 0;
    const updateText = (text : string) => props.onEdited !== undefined ? props.onEdited(props.itemId, text) : void 0;

    return <EditableText editing = {props.editing}
        inputComponentClass = {SingleLineEditor} 
        staticComponentClass={Heading.Component}
        staticProps = {headingProps}
        value={props.value}
        toggleIsEditing = {toggleIsEditing}
        updateValue = {updateText} />
}

function mapHeadingStateToProps(itemState : Props, updatedBaseProps: Partial<EditableProps<any>>) {
    return {
        ... updatedBaseProps,
        level : itemState.level
    }
}



export default connect(createEditableStateToPropsMapper(mapHeadingStateToProps), mapBaseActionsToProps)(EditableHeading);
