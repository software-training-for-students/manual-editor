import * as React from "react";

interface Props {
    value: string | undefined;
    onClick?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
}

const HtmlPresenter = (props: Props) => {
    const {value, ...rest} = props;
    if (value === undefined) {
        return <div />;
    }
    return <div dangerouslySetInnerHTML={{ __html : value}} {...rest} />;
};

export default HtmlPresenter;
