import * as React from "react";

interface Props {
    value: string | undefined;
    onClick?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
}

const HtmlPresenter = (props: Props) => {
    const {value, onClick, ...rest} = props;
    if (value === undefined) {
        return <div />;
    }
    const onClickHandler = (e: React.SyntheticEvent<HTMLDivElement>) => {
        for (let target = e.target as HTMLElement; target !== e.currentTarget; target = target.parentElement!) {
            if (target.tagName === "A") {
                return;
            }
        }
        if (onClick) {
            onClick(e);
        }
    };

    return <div onClick={onClickHandler} dangerouslySetInnerHTML={{ __html : value}} {...rest} />;
};

export default HtmlPresenter;
