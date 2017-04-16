import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";

// These are used for images in the old manual style.
const legacyImagesFolder = "images/";
const legacyKeyboardIconsFolder = "keyboard-icons";

interface Props {
    src: string;
    actualSource?: string;
    [key: string]: any;
}

class Image extends React.Component<Props, void> {
    public render() {
        return <img {...this.props} src={this.props.actualSource} />;
    }
}

function mapStateToProps(store: Store, props: Props): Props {
    let src = props.src;
    if (src) {
        // Strip out old folder paths. This enables easy importing without changing the save file ZIP format.
        if (src.startsWith(legacyImagesFolder)) {
            src = src.substr(legacyImagesFolder.length);
        }
        if (src.startsWith(legacyKeyboardIconsFolder)) {
            src = src.substr(legacyKeyboardIconsFolder.length);
        }
    }
    return {
        ...props,
        actualSource: store.images[props.src] ? store.images[props.src].imageUrl : props.src,
    };
}

export default connect(mapStateToProps)(Image);
