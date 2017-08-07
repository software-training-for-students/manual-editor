import KeyToImageMap from "core/KeyToImageMap";
import * as React from "react";

interface Props {
    icon: keyof typeof KeyToImageMap;
}

export default class KeyboardKeyPresenter extends React.Component<Props, {}> {
    public render() {
        let icon = this.props.icon;
        return <kbd>{icon}</kbd>;
    }
}
