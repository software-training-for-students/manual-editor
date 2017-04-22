import {RawHtml as Props} from "core/ElementInfo";
import * as React from "react";

const onClickHandler = (e: React.SyntheticEvent<HTMLDivElement>) => {
    for (let target = e.target as HTMLElement; target !== e.currentTarget; target = target.parentElement!) {
        if (target.tagName === "A") {
            e.stopPropagation();
        }
    }
};

const HtmlPresenter = (props: Props) => {
    const {value, ...rest} = props;

    return <div onClick={onClickHandler} dangerouslySetInnerHTML={{ __html : value}} {...rest} />;
};

export default HtmlPresenter;
