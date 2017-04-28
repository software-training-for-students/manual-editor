import {RemoveFromDocument} from "actions/BaseEditActions";
import * as React from "react";
import {connect} from "react-redux";
import {compose} from "redux";

interface Props {
    onRemove: (itemId: number) => void;
}

function removableCore<TProps extends {itemId: number}>(Component: React.ComponentClass<TProps> | React.SFC<TProps>): React.ComponentClass<TProps & Props> {
    return class extends React.Component<TProps & Props, {}> {
        public render() {
            // Workaround until a Typescript version with Microsoft/Typescript#13288 is merged
            let childProps: any = Object.assign({}, this.props);
            return (
                <div className="removable">
                    <button onClick={this.onRemoveClick}>X</button>
                    <Component {...childProps} />
                </div>
            );
        }

        private onRemoveClick = () => {
            this.props.onRemove(this.props.itemId);
        }
    };
}

function mapStateToProps(state: any, props: any) {
    return {};
}

const mapActionsToProps = {
    onRemove: (itemId: number) => ({
        type: "removeFromDocument",
        itemId,
    } as RemoveFromDocument),
};

export default function removable<TProps extends {itemId: number}>(component: React.ComponentClass<TProps> | React.SFC<TProps>): React.ComponentClass<TProps & Props> {
    return compose(connect(mapStateToProps, mapActionsToProps), removableCore)(component);
}
