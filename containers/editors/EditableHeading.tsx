import EditableContent from "components/EditableContent";
import * as Heading from "components/Heading";
import SingleLineEditor from "components/SingleLineEditor";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "DocumentMappers";
import {EditableProps, getCommonInteractiveEditableProps, InteractiveEditableProps} from "EditableBase";
import * as React from "react";
import {connect} from "react-redux";

interface Props extends InteractiveEditableProps<string> {
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

class EditableText extends EditableContent<string> {}

const EditableHeading: React.StatelessComponent<Props> = (props: Props) => {
    let headingProps: Heading.Props = {
        level : props.level,
    };
    let inputProps = {
        className : "h" + props.level,
    };
    return <EditableText
        {...props}
        {...getCommonInteractiveEditableProps(props)}
        inputComponentClass = {SingleLineEditor}
        staticComponentClass={Heading.Component}
        inputProps = {inputProps}
        staticProps = {headingProps}
    />;
};

function mapHeadingStateToProps(itemState: Props, updatedBaseProps: Partial<EditableProps<any>>) {
    return {
        ... updatedBaseProps,
        level : itemState.level,
    };
}

export default connect(createEditableStateToPropsMapper(mapHeadingStateToProps), mapBaseActionsToProps)(EditableHeading);
