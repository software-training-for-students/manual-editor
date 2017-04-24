import ImportLegacyManual, {FileChangedAction} from "actions/ImportLegacyManual";
import * as React from "react";
import ActivityIndicator from "react-activity-indicator";
import "react-activity-indicator/src/activityindicator.css";
import {connect} from "react-redux";
import {compose} from "redux";
import connectDialog from "redux-dialog";
import {Store} from "stores";

interface Props {
    fileToImport?: File;
    importing: boolean;
    onRequestClose: () => void;
    onFileChanged: (file: File) => void;
    onImport: (file: File) => void;
}

class ImportWizard extends React.Component<Props, void> {
    public render() {
        if (this.props.importing) {
            return (
                <div>
                    <ActivityIndicator duration={100} />
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={this.props.onRequestClose}>Close</button>
                    <header>Import Legacy (HTML) Manual</header>
                    <input type="file" accept=".zip" onChange={this.fileChanged} />
                    <button disabled={!this.props.fileToImport} onClick={this.onImport}>Import</button>
                </div>
            );
        }
    }

    private fileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            this.props.onFileChanged(event.currentTarget.files[0]);
        }
    }

    private onImport = () =>{
        if (this.props.fileToImport) {
            this.props.onImport(this.props.fileToImport);
        }
    }
};

function mapStateToProps(store: Store): Partial<Props> {
    return {
        fileToImport: store.menu.import.file,
        importing: store.menu.import.importing,
    };
}

const mapActionsToProps = ({
    onFileChanged : (file: File) => ({
        file,
        type: "import-file-changed",
    } as FileChangedAction),
    onImport: ImportLegacyManual,
});

export default compose(connectDialog({name: "import-wizard"}), connect(mapStateToProps, mapActionsToProps))(ImportWizard);
