import KeyboardShortcutPresenter from "components/KeyboardShortcutPresenter";
import {Presenter as RichTextPresenter} from "components/RichText";
import KeyToImageMap from "core/KeyToImageMap";
import {RawDraftContentState} from "draft-js";
import * as React from "react";

interface Value {
    title: string;
    content: RawDraftContentState;
    shortcuts: Array<Array<keyof typeof KeyToImageMap>>;
    type: "no-shortcut" | "shortcut" | "multi-shortcut";
}

interface Props {
    value: Value;
    onClick: (e: React.SyntheticEvent<HTMLElement>) => void;
}

export default class KeyboardShortcutSidebarPresenter extends React.Component<Props, void> {
    public render() {
        return (
            <div onClick={this.props.onClick}>
                <span className="edit-hint">
                    Click here to edit shortcut below.
                </span>
                <div className="keyboard-shortcut">
                    <h2>{this.props.value.title}</h2>
                    <RichTextPresenter value={this.props.value.content} />
                    {this.renderShortcut()}
                </div>
            </div>
        );
    }

    private renderShortcut() {
        switch (this.props.value.type) {
            case "no-shortcut":
            return null;
            case "shortcut":
            return <KeyboardShortcutPresenter keys={this.props.value.shortcuts[0]} />;
            case "multi-shortcut":
            return (
                <div>
                    <h3>Mac:</h3>
                    <KeyboardShortcutPresenter keys={this.props.value.shortcuts[0]} />
                    <h3>Windows:</h3>
                    <KeyboardShortcutPresenter  keys={this.props.value.shortcuts[1]} />
                </div>
            );
            default:
            throw new Error(`Invalid shortcut type ${this.props.value.type}`);
        }
    }
}
