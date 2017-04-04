import HtmlPresenter from "components/HtmlPresenter";
import {convertToHTML, RawEntity} from "draft-convert";
import {convertFromRaw, RawDraftContentState} from "draft-js";
import * as React from "react";

interface Props {
    value: RawDraftContentState;
    onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
}

function entityConverter(entity: RawEntity, originalText: string) {
    let entityData = entity.data as any;
    if (entity.type === "LINK") {
        return <a href={entityData.url} target="_blank">{originalText}</a>;
    }
    if (entity.type === "TELETYPE") {
        return <span className="type-text">{originalText}</span>;
    }
    if (entity.type === "HIGHLIGHT") {
        return <span className="highlight">{originalText}</span>;
    }
    return originalText;
}

const htmlConvert = convertToHTML({entityToHTML: entityConverter});

const RichTextPresenter = (props: Props) => {
    const htmlProps = {... props, value : htmlConvert(convertFromRaw(props.value))};
    return <HtmlPresenter {...htmlProps} onClick={props.onClick} />;
};

export default RichTextPresenter;
