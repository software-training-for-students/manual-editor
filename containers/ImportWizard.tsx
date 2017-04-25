import ImportLegacyManual, {FileChangedAction} from "actions/ImportLegacyManual";
import * as React from "react";
import ActivityIndicator from "react-activity-indicator";
import "react-activity-indicator/src/activityindicator.css";
import {connect} from "react-redux";
import {compose} from "redux";
import connectDialog from "redux-dialog";
import {Store} from "stores";
import * as boxFolder from "static/box-folder.png";
import * as boxDownload from "static/box-download.png";

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
                <div style={contentContainerStyle}>
                    <ActivityIndicator duration={100} />
                </div>
            );
        } else {
            return (
                <div style={contentContainerStyle}>
                    <button onClick={this.props.onRequestClose}>Close</button>
                    <header>Import Legacy (HTML) Manual Zip File</header>
                    <input type="file" accept=".zip" onChange={this.fileChanged} />
                    <button disabled={!this.props.fileToImport} onClick={this.onImport}>Import</button>
                    <h1>How to Create the Zip File</h1>
                    <ol className="instruction-list">
                        <li><p>Open your Box.com Account</p></li>
                        <li><p>Navigate to the Current Manuals (HTML) folder</p></li>
                        <li><p>Open the folder for the class manual you are importing</p></li>
                        <li><p>Download the folder. This will create the Zip file.</p></li>
                        <div className="full-width-image">
                            <img src={boxFolder} />
                        </div>
                        <div className="full-width-image">
                            <img src={boxDownload} />
                        </div>
                    </ol>
                </div>
            );
        }
    }

    private fileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            this.props.onFileChanged(event.currentTarget.files[0]);
        }
    }

    private onImport = () => {
        if (this.props.fileToImport) {
            this.props.onImport(this.props.fileToImport);
        }
    }
};

const contentContainerStyle = {
    margin: "auto",
    textAlign: "left",
    width: "50%",
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

export default compose(connectDialog({
    contentLabel: "Import Wizard",
    name: "import-wizard",
}), connect(mapStateToProps, mapActionsToProps))(ImportWizard);
