import * as React from "react";

type Props = {
    value: string;
    onClick: (e: React.SyntheticEvent<HTMLLIElement>) => void;
};

export default function(props: Props) {
    return (
        <li {...props}>
            <p>{props.value}</p>
        </li>
    );
}
