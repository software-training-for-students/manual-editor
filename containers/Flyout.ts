import {Props} from "@aneves/react-flyout";
import FlyoutWrapper from "@aneves/react-flyout";
import "@aneves/react-flyout/dist/flyout.css";
import {FlyoutToggle} from "actions/FlyoutActions";
import {connect} from "react-redux";
import { Store } from "stores";

const mapStateToProps = (state: Store, oldProps: Props) => {
    if (state.flyout.id === oldProps.id) {
        return {
            open: state.flyout.open,
            options: { ...oldProps.options, ... state.flyout.options},
        };
    }
    return {};
};

const mapDispatchToProps = {
    onWindowClick: () => (<FlyoutToggle> {
        type : "flyout-toggle",
    }),
};

const Flyout = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FlyoutWrapper);

export default Flyout;
