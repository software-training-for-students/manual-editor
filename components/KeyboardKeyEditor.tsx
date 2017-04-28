import KeyToImageMap from "core/KeyToImageMap";
import * as React from "react";

interface KeyProps {
    index: number;
    icon: keyof typeof KeyToImageMap;
    onIconChanged: (index: number, icon: keyof typeof KeyToImageMap) => void;
    deleteKey: (index: number) => void;
}

class KeyboardKeyEditor extends React.Component<KeyProps, {}> {
     public render() {
         return (
            <span>
                <select value={this.props.icon} onChange={this.onIconChanged}>
                    {
                        Object.getOwnPropertyNames(KeyToImageMap).map((image: keyof typeof KeyToImageMap) => (
                            <option key={image} value={image} disabled={image === "none"} hidden={image === "none"}>{KeyToImageMap[image]}</option>
                        ))
                    }
                </select>
                <button onClick={this.onDelete}>X</button>
            </span>
        );
    }

    private onIconChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onIconChanged(this.props.index, e.target.value as keyof typeof KeyToImageMap);
    }

    private onDelete = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        this.props.deleteKey(this.props.index);
    }
}

export default KeyboardKeyEditor;
