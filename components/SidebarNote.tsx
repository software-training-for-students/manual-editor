import RichTextPresenter from "components/RichTextPresenter";
import {EditorState} from "draft-js";
import * as React from "react";

interface Props {
    value: {
        title: string;
        content: EditorState;
        imgSource: string;
    };
}

const SidebarNote: React.StatelessComponent<Props> = (props: Props) => {
    let {value, ...rest} = props;
    return (
        <div className="sidebar-note" {...rest}>
            <h2>{value.title}</h2>
            <RichTextPresenter value={value.content} />
            <img src={value.imgSource} />
        </div>
    );
};

export default SidebarNote;
