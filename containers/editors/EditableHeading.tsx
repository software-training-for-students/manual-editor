import EditableElement from "components/EditableElement";
import Heading from "components/Heading";
import SingleLineEditor from "components/SingleLineEditor";
import connectEditable from "core/connectEditable";
import {Heading as ElementInfo} from "core/ElementInfo";
import InteractivePropsFromElementInfo from "core/InteractivePropsFromElementInfo";
import * as React from "react";

type Props = InteractivePropsFromElementInfo<ElementInfo>;

const EditableHeading: React.StatelessComponent<Props> = (props: Props) => {
    const EditableText: new(...args: any[]) => EditableElement<ElementInfo> = EditableElement;
    let headingProps: Pick<Props, "level"> = {
        level : props.level,
    };
    let inputProps = {
        className : "h" + props.level,
    };
    return <EditableText
        {...props}
        inputComponentClass = {SingleLineEditor}
        staticComponentClass={Heading}
        inputProps = {inputProps}
        staticProps = {headingProps}
    />;
};

export default connectEditable(EditableHeading);
