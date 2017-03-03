import HtmlPresenter from "components/HtmlPresenter";
import {convertToHTML} from "draft-convert";
import {EditorState} from "draft-js";
import * as React from "react";

interface Props {
    value: EditorState;
}

const RichTextPresenter = (props: Props) => {
    const htmlProps = {... props, value : convertToHTML(props.value.getCurrentContent())};
    return <HtmlPresenter {...htmlProps} />;
};

export default RichTextPresenter;
