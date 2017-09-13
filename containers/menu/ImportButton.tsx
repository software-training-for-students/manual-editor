import ImportWizard from "containers/ImportWizard";
import * as React from "react";
import {connect} from "react-redux";
import {openDialog} from "redux-dialog-extended";

interface Props {
    toggleWizard: () => any;
}

class ImportButton extends React.Component<Props, {}> {
    public render() {
        return (
            <div className="has-flyout">
                <button onClick={this.toggleWizard}>Import</button>
                <ImportWizard />
            </div>
        );
    }

    private toggleWizard = () => {
        this.props.toggleWizard();
    }
}

let mapActionsToProps = ({
    toggleWizard : () => openDialog("import-wizard"),
});

export default connect(undefined, mapActionsToProps)(ImportButton);
