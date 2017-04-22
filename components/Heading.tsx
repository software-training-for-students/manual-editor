import {Heading as ElementInfo} from "core/ElementInfo";
import * as React from "react";

export default function Heading (props: ElementInfo) {
    const {level, ... rest} = props;
    const Tag = "h" + level.toString();
    return <Tag {...rest}>{props.value}</Tag>;
};
