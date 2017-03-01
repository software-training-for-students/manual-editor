import * as React from "react";
import HtmlPresenter from "components/HtmlPresenter";
import {EditorState} from "draft-js";
import {convertToHTML} from "draft-convert";

interface Props {
    value : EditorState;
}

const RichTextPresenter = (props : Props) => {
    const htmlProps = {... props, value : convertToHTML(props.value.getCurrentContent())};
    return <HtmlPresenter {...htmlProps} />
}

export default RichTextPresenter;