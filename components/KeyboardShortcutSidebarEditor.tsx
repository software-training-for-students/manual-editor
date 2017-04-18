import KeyboardShortcutEditor from "components/KeyboardShortcutEditor";
import {Editor as RichTextEditor} from "components/RichText";
import KeyToImageMap from "core/KeyToImageMap";
import {RawDraftContentState} from "draft-js";
import * as React from "react";

type ShortcutType = "no-shortcut" | "shortcut" | "multi-shortcut";

interface Value {
    title: string;
    content: RawDraftContentState;
    shortcuts: Array<Array<keyof typeof KeyToImageMap>>;
    type: ShortcutType;
}

interface Props {
    value: Value;
    onValueChange: (value: Value) => void;
}

export default class KeyboardShortcutSidebarEditor extends React.Component<Props, void> {
    public render() {
        return (
            <div className="keyboard-shortcut">
                <input type="text" value={this.props.value.title} placeholder="Keyboard Shortcut Title" onChange={this.titleChanged} />
                <RichTextEditor value={this.props.value.content} onValueChange={this.contentChanged} />
                <div>
                    <label>Shortcut Element Type</label>
                    <select value={this.props.value.type} defaultValue={"no-shortcut"} onChange={this.typeChanged}>
                        <option value="no-shortcut">No Keyboard Icons</option>
                        <option value="shortcut">One Keyboard Shortcut</option>
                        <option value="multi-shortcut">Shortcuts for Mac and Windows</option>
                    </select>
                </div>
                {this.renderShortcut()}
            </div>
        );
    }

    private renderShortcut() {
        switch (this.props.value.type) {
            case "no-shortcut":
                return null;
            case "shortcut":
                return <KeyboardShortcutEditor os="" keys={this.props.value.shortcuts[0]} onShortcutChanged={this.shortcutChanged} />;
            case "multi-shortcut":
                return (
                    <div>
                        <h3>Mac:</h3>
                        <KeyboardShortcutEditor os="mac" keys={this.props.value.shortcuts[0]} onShortcutChanged={this.shortcutChanged} />
                        <h3>Windows:</h3>
                        <KeyboardShortcutEditor os="win" keys={this.props.value.shortcuts[1]} onShortcutChanged={this.shortcutChanged} />
                    </div>
                );
            default:
                throw new Error(`Invalid shortcut type ${this.props.value.type}`);
        }
    }

    private titleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onValueChange({... this.props.value, title: e.currentTarget.value});
    }

    private contentChanged = (content: RawDraftContentState) => {
        this.props.onValueChange({... this.props.value, content});
    }

    private typeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onValueChange({... this.props.value, type: e.currentTarget.value as ShortcutType});
    }

    private shortcutChanged = (os: string, keys: Array<keyof typeof KeyToImageMap>) => {
        if (this.props.value.type === "no-shortcut") {
            console.warn("Shortcut update from a no-shortcut editor.");
            return;
        } else if (this.props.value.type === "shortcut") {
            this.props.onValueChange({... this.props.value, shortcuts: [keys]});
            return;
        } else if (this.props.value.type === "multi-shortcut") {
            let shortcuts = this.props.value.shortcuts.slice();
            if (os === "mac") {
                shortcuts[0] = keys;
            } else if (os === "win") {
                shortcuts[1] = keys;
            }
            this.props.onValueChange({... this.props.value, shortcuts});
            return;
        }
        throw new Error(`Invalid shortcut type ${this.props.value.type}`);
    }
}
