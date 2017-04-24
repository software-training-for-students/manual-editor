import ImportWizard from "containers/ImportWizard";
import * as React from "react";
import {connect} from "react-redux";
import {openDialog} from "redux-dialog";
import {Store} from "stores";

interface Props {
    toggleWizard: () => void;
}

class ImportButton extends React.Component<Props, void> {
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

function mapStateToProps(state: Store): Partial<Props> {
    return {};
}

let mapActionsToProps = ({
    toggleWizard : () => openDialog("import-wizard"),
});

export default connect(mapStateToProps, mapActionsToProps)(ImportButton);
