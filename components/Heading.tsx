import * as React from "react";

export type Props = React.HTMLAttributes<HTMLHeadingElement> & 
    {
        level : 1 | 2 | 3 | 4 | 5 | 6
    };

export const Component : React.StatelessComponent<Props> = (props : Props) => {
    const Tag = "h" + props.level.toString();
    const {level, ... rest} = props;
    return <Tag {...rest}>{props.value}</Tag>
}