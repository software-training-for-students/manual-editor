import LoadWizard from "containers/LoadWizard";
import * as React from "react";
import {connect} from "react-redux";
import {openDialog} from "redux-dialog-extended";

interface Props {
    toggleWizard: () => any;
}

class LoadButton extends React.Component<Props, {}> {
    public render() {
        return (
            <div className="has-flyout">
                <button onClick={this.toggleWizard}>Load</button>
                <LoadWizard />
            </div>
        );
    }

    private toggleWizard = () => {
        this.props.toggleWizard();
    }
}

let mapActionsToProps = ({
    toggleWizard : () => openDialog("load-wizard"),
});

export default connect(undefined, mapActionsToProps)(LoadButton);
