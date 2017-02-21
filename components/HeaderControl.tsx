import * as React from "react";
import {connect} from "react-redux";
import Flyout from "../containers/Flyout";
import * as FlyoutActions from "../actions/FlyoutActions";
import {AddToDocument} from "../actions/BaseEditActions";
import {Store} from "../stores";

interface Props {
    toggleFlyout : (flyoutId : string) => void;
    onCreateHeader : (componentTypeName : string,
        defaultProps : any,
        ordering: "before" | "after" | "end",
        relativeToItem? : number) => void;
        
}

class HeaderControl extends React.Component<Props, void> {
    public render() {
        return (
        <div className="has-flyout">
            <button data-flyout-id="create-heading" onClick={e => this.props.toggleFlyout("create-heading")}>Create Heading</button>
            <Flyout id="create-heading" options={{
                align: "right middle"
            }}>
            <div>Hi!</div>
            </Flyout>
        </div>
        );
    }
}

function mapStateToProps(state : Store) {
    return {};
}

var mapActionsToProps = ({
    toggleFlyout : (id : string) => ({
        type : "flyout-toggle",
        id : id
    } as FlyoutActions.FlyoutToggle),
    onCreateHeader : (componentTypeName : string,
        defaultProps : any,
        ordering: "before" | "after" | "end",
        relativeToItem? : number) => ({
            type : "addToDocument",
            ordering,
            relativeToItem,
            defaultProps
        } as AddToDocument)
});

export default connect(mapStateToProps, mapActionsToProps)(HeaderControl);