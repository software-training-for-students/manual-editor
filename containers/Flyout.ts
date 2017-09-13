import FlyoutWrapper, {WrapperProps} from "@aneves/react-flyout";
import "@aneves/react-flyout/dist/flyout.css";
import {FlyoutToggle} from "actions/FlyoutActions";
import {connect, Dispatch} from "react-redux";
import { Store } from "stores";

const mapStateToProps = (state: Store, oldProps: WrapperProps) => {
    if (state.flyout.id === oldProps.id) {
        return <WrapperProps> {
            ...oldProps,
            open: state.flyout.open || false,
            options: { ...oldProps.options, ... state.flyout.options},
        };
    }
    return oldProps;
};

function mapDispatchToProps(dispatch: Dispatch<Store>) {
    return {
        onWindowClick: () => {
            dispatch(<FlyoutToggle> {
                type: "flyout-toggle",
            });
        },
    };
}

const Flyout = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FlyoutWrapper);

export default Flyout;
