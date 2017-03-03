import {FlyoutToggle} from "actions/FlyoutActions";
import Flyout from "containers/Flyout";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";

type Ordering = "before" | "after" | "end";

interface Props {
    menuItemId: string;
    menuItemText: string;
    menuItemHeading: string;
    onCreate: (location: Ordering) => void;
    toggleFlyout?: (flyoutId: string) => void;
    enableRelativeInsert?: boolean | undefined;
    insertEnabled: boolean;
}

class MenuItem extends React.Component<Props, void> {
    public render() {
        return (
            <div className="has-flyout">
                <button data-flyout-id={this.props.menuItemId} onClick={this.toggleFlyout}>{this.props.menuItemText}</button>
                <Flyout id={this.props.menuItemId} options={{align: "bottom middle"}}>
                    <div>
                        <header>{this.props.menuItemHeading}</header>
                        {this.props.children}
                        <div className="create-buttons">
                        <button
                            disabled={!this.props.enableRelativeInsert || !this.props.insertEnabled}
                            value="before"
                            onClick={this.onCreate}
                        >
                            {"Insert Before Current Element"}
                        </button>
                        <button
                            disabled={!this.props.enableRelativeInsert || !this.props.insertEnabled}
                            value="after"
                            onClick={this.onCreate}
                        >
                            {"Insert After Current Element"}
                        </button>
                        <button
                            disabled={!this.props.insertEnabled}
                            value="end"
                            onClick={this.onCreate}
                        >  
                            {"Insert At End"}
                        </button>
                        </div>
                    </div>
                </Flyout>
            </div>
        );
    }

    private toggleFlyout = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        if (this.props.toggleFlyout !== undefined) {
            this.props.toggleFlyout(this.props.menuItemId);
        }
    }

    private onCreate = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        this.props.onCreate(e.currentTarget.value as Ordering);
    }
}

function mapStateToProps(state: Store, props: Props): Props {
    let enableRelativeInsert: boolean = false;
     // Start at 3 because item ids 1 and 2 are the title and subtitle, which are special ids
    for (let i = 3; i < state.document.nextItemId; ++i) {
        if (state.document[i] && state.document[i].editing) {
            enableRelativeInsert = true;
            break;
        }
    }
    return {... props, enableRelativeInsert};
}

let mapActionsToProps = ({
    toggleFlyout: (id: string) => ({
        type: "flyout-toggle",
        id,
    } as FlyoutToggle),
});

export default connect(mapStateToProps, mapActionsToProps)(MenuItem);
