import * as React from "react";

export type Props = {
    value: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    onClick: (e: React.SyntheticEvent<HTMLElement>) => void;
};

export const Component: React.StatelessComponent<Props> = (props: Props) => {
    const {level, ... rest} = props;
    const Tag = "h" + level.toString();
    return <Tag {...rest}>{props.value}</Tag>;
};
