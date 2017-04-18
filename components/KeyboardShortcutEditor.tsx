import KeyboardKeyEditor from "components/KeyboardKeyEditor";
import KeyToImageMap from "core/KeyToImageMap";
import * as React from "react";

interface Props {
    os: string;
    keys: Array<keyof typeof KeyToImageMap>;
    onShortcutChanged: (os: string, keys: Array<keyof typeof KeyToImageMap>) => void;
}

class KeyboardShortcutEditor extends React.Component<Props, void> {
    public render() {
        return (
            <div>
                {
                    this.props.keys.map((item, idx) =>
                        <KeyboardKeyEditor
                            key={idx}
                            icon={item}
                            index={idx}
                            onIconChanged={this.onIconChanged}
                            deleteKey={this.deleteKey}
                        />,
                    )
                }
                <button onClick={this.addKey}>+</button>
            </div>
        );
    }

    private onIconChanged = (index: number, icon: keyof typeof KeyToImageMap) => {
        let keys = this.props.keys.slice();
        keys[index] = icon;
        this.props.onShortcutChanged(this.props.os, keys);
    }

    private deleteKey = (index: number) => {
        let keys = this.props.keys.slice();
        keys.splice(index, 1);
        this.props.onShortcutChanged(this.props.os, keys);
    }

    private addKey = () => {
        this.props.onShortcutChanged(this.props.os, this.props.keys.concat(["none"]));
    }
}

export default KeyboardShortcutEditor;
