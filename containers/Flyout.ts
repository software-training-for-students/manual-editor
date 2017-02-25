import { Store } from 'stores';
import {connect, Dispatch} from 'react-redux';
import {FlyoutToggle} from "actions/FlyoutActions";
import {Props} from "@aneves/react-flyout";
import FlyoutWrapper from '@aneves/react-flyout';

const mapStateToProps = (state : Store, ownProp : Props) => {
    if (state.flyout.id === ownProp.id) {
        return {
            open: state.flyout.open,
            options: { ...ownProp.options, ... state.flyout.options}
        };
    }
    return {};
}

const mapDispatchToProps = {
    onWindowClick: () => (<FlyoutToggle>{
        type : "flyout-toggle"
    })
}

const Flyout = connect(
    mapStateToProps,
    mapDispatchToProps
)(FlyoutWrapper);

export default Flyout;