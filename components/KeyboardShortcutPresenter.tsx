import KeyboardKeyPresenter from "components/KeyboardKeyPresenter";
import KeyToImageMap from "core/KeyToImageMap";
import * as React from "react";

interface Props {
    keys: Array<keyof typeof KeyToImageMap>;
}

class KeyboardShortcutEditor extends React.Component<Props, {}> {
    public render() {
        return (
            <div>
                {
                    this.props.keys.map((item, idx) =>
                        <KeyboardKeyPresenter
                            key={idx}
                            icon={item}
                        />,
                    )
                }
            </div>
        );
    }
}

export default KeyboardShortcutEditor;
