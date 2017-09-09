import {Presenter as RichTextPresenter} from "components/RichText";
import SmartImagePresenter from "containers/SmartImagePresenter";
import {SidebarNote as Props} from "core/ElementInfo";
import * as React from "react";

const SidebarNote: React.StatelessComponent<Props> = (props: Props) => {
    let {value, ...rest} = props;
    return (
        <div {...rest}>
            <span className="edit-hint">
                Click here to edit note below.
            </span>
            <div className="sidebar-note">
                <h2>{value.title}</h2>
                <RichTextPresenter value={value.content} />
                <SmartImagePresenter src={value.imgSource || ""} />
            </div>
        </div>
    );
};

export default SidebarNote;
