import * as React from "react";
import {connect} from "react-redux";
import Flyout from "containers/Flyout";
import {FlyoutToggle} from "actions/FlyoutActions";
import {Store} from "stores";

interface Props {
    menuItemId : string;
    menuItemText: string;
    confirmationText : string;
    onCreate : () => void;
    toggleFlyout? : (flyoutId : string) => void
}

class MenuItem extends React.Component<Props, void> {
    public render() {
        return (
            <div className="has-flyout">
                <button data-flyout-id={this.props.menuItemId} onClick={this.toggleFlyout}>{this.props.menuItemText}</button>
                <Flyout id={this.props.menuItemId} options={{align: "right middle"}}>
                    <div>
                        {this.props.children}
                        <button onClick={this.onCreate}>{this.props.confirmationText}</button>
                    </div>
                </Flyout>
            </div>
        );
    }

    private toggleFlyout = (e : React.SyntheticEvent<HTMLButtonElement>) => {
        if(this.props.toggleFlyout !== undefined)
            this.props.toggleFlyout(this.props.menuItemId);
    }

    private onCreate = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        this.props.onCreate();
    }
}

function mapStateToProps(state : Store, props : Props) : Props {
    return {... props};
}

var mapActionsToProps = ({
    toggleFlyout : (id : string) => ({
        type : "flyout-toggle",
        id : id
    } as FlyoutToggle)
})

export default connect(mapStateToProps, mapActionsToProps)(MenuItem);