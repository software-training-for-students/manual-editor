import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";

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
    return {
        ...props,
        actualSource: store.images[props.src] ? store.images[props.src].imageUrl : props.src,
    };
}

export default connect(mapStateToProps)(Image);
