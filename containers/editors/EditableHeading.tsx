import EditableContent from "components/EditableContent";
import Heading from "components/Heading";
import SingleLineEditor from "components/SingleLineEditor";
import connectEditable from "core/connectEditable";
import {EditableProps, getCommonInteractiveEditableProps, InteractivePropsFromElementInfo} from "core/EditableBase";
import {Heading as ElementInfo} from "core/ElementInfo";
import * as React from "react";

type Props = InteractivePropsFromElementInfo<ElementInfo>;

class EditableText extends EditableContent<ElementInfo["value"]> {}

const EditableHeading: React.StatelessComponent<Props> = (props: Props) => {
    let headingProps: Pick<Props, "level"> = {
        level : props.level,
    };
    let inputProps = {
        className : "h" + props.level,
    };
    return <EditableText
        {...props}
        {...getCommonInteractiveEditableProps(props)}
        inputComponentClass = {SingleLineEditor}
        staticComponentClass={Heading}
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

export default connectEditable(mapHeadingStateToProps)(EditableHeading);
