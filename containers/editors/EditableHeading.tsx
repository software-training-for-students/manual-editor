import * as React from "react";
import * as ReactRedux from "react-redux";
import EditableContent from "components/EditableContent";
import SingleLineEditor from "components/SingleLineEditor";
import * as Heading from "components/Heading";
import {EditableProps, InteractiveEditableProps, getCommonInteractiveEditableProps} from "EditableBase";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "DocumentMappers";
import {connect} from "react-redux";
import ElementTypes from "ElementTypes";

interface Props extends InteractiveEditableProps<string> {
    level : 1 | 2 | 3 | 4 | 5 | 6;
}

class EditableText extends EditableContent<string> {}

const EditableHeading : React.StatelessComponent<Props> = (props : Props) => {
    var headingProps : Heading.Props = {
        level : props.level
    };
    var inputProps = {
        className : "h" + props.level
    };

    const {toggleIsEditing, updateValue} = getCommonInteractiveEditableProps(props);
    return <EditableText editing = {props.editing}
        inputComponentClass = {SingleLineEditor} 
        staticComponentClass={Heading.Component}
        inputProps = {inputProps}
        staticProps = {headingProps}
        value={props.value}
        toggleIsEditing = {toggleIsEditing}
        updateValue = {updateValue} />
}

function mapHeadingStateToProps(itemState : Props, updatedBaseProps: Partial<EditableProps<any>>) {
    return {
        ... updatedBaseProps,
        level : itemState.level
    }
}



export default connect(createEditableStateToPropsMapper(mapHeadingStateToProps), mapBaseActionsToProps)(EditableHeading);