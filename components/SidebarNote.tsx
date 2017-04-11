import {Presenter as RichTextPresenter} from "components/RichText";
import SmartImagePresenter from "containers/SmartImagePresenter";
import {RawDraftContentState} from "draft-js";
import * as React from "react";

interface Props {
    value: {
        title: string;
        content: RawDraftContentState;
        imgSource: string;
    };
    onClick: (e: React.SyntheticEvent<HTMLDivElement>) => void;
}

const SidebarNote: React.StatelessComponent<Props> = (props: Props) => {
    let {value, ...rest} = props;
    return (
        <div className="sidebar-note" {...rest}>
            <h2>{value.title}</h2>
            <RichTextPresenter value={value.content} />
            <SmartImagePresenter src={value.imgSource} />
        </div>
    );
};

export default SidebarNote;
