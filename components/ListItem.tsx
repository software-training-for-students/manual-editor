import {Presenter as RichTextPresenter} from "components/RichText";
import {RawDraftContentState} from "draft-js";
import * as React from "react";

type Props = {
    value: RawDraftContentState;
    onClick: (e: React.SyntheticEvent<HTMLLIElement>) => void;
};

export default function(props: Props) {
    return (
        <li onClick={props.onClick}>
            <p>
                <RichTextPresenter {... props} />
            </p>
        </li>
    );
}
