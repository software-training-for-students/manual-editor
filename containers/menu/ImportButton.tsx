import {FlyoutToggle} from "actions/FlyoutActions";
import ImportLegacyManual, {FileChangedAction} from "actions/ImportLegacyManual";
import Flyout from "containers/Flyout";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";

interface Props {
    toggleFlyout: (id: string) => void;
    onSave: () => void;
    onImport: (file: File) => void;
    onFileChanged: (file: File) => void;
    fileToImport: File;
}

class ImportButton extends React.Component<Props, void> {
    public render() {
        return (
            <div className="has-flyout">
                <button data-flyout-id="import-flyout" onClick={this.toggleImportFlyout}>Import</button>
                <Flyout id="import-flyout" options={{align: "bottom middle"}}>
                    <div>
                        <header>Import Legacy (HTML) Manual</header>
                        <input type="file" accept=".zip" onChange={this.fileChanged} />
                        <button onClick={this.onImport}>Load</button>
                    </div>
                </Flyout>
            </div>
        );
    }

    private toggleImportFlyout = () => {
        this.props.toggleFlyout("import-flyout");
    }

    private fileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            this.props.onFileChanged(event.currentTarget.files[0]);
        }
    }

    private onImport = () => this.props.onImport(this.props.fileToImport);
}

function mapStateToProps(state: Store): Partial<Props> {
    return {
        fileToImport : state.menu.import.file,
    };
}

let mapActionsToProps = ({
    onFileChanged : (file: File) => ({
        file,
        type: "import-file-changed",
    } as FileChangedAction),
    onImport: ImportLegacyManual,
    toggleFlyout : (id: string) => ({
        type: "flyout-toggle",
        id,
    } as FlyoutToggle),
});

export default connect(mapStateToProps, mapActionsToProps)(ImportButton);
