import * as React from "react";

interface Props {
    value: string;
}

const HtmlPresenter = (props : Props) => {
    const {value, ...rest} = props;
    return <div dangerouslySetInnerHTML={{ __html : value}} {...rest} />
}

export default HtmlPresenter;