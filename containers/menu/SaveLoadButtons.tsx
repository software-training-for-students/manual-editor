import {FlyoutToggle} from "actions/FlyoutActions";
import * as SaveLoadActions from "actions/SaveLoadActions";
import Flyout from "containers/Flyout";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";

interface Props {
    toggleFlyout: (id: string) => void;
    onSave: () => void;
    onLoad: (file: File) => void;
    onFileChanged: (file: File) => void;
    fileToLoad: File;
}

class SaveLoadButtons extends React.Component<Props, void> {
    public render() {
        return (
            <div>
                <button onClick={this.onSave}>Save</button>
                
                <div className="has-flyout">
                    <button data-flyout-id="load-flyout" onClick={this.toggleLoadFlyout}>Load</button>
                    <Flyout id="load-flyout" options={{align: "bottom middle"}}>
                        <div>
                            <header>Load Manual</header>
                            <input type="file" onChange={this.fileChanged} />
                            <button onClick={this.onLoad}>Load</button>
                        </div>
                    </Flyout>
                </div>
            </div>
        );
    }

    private toggleLoadFlyout = () => {
        this.props.toggleFlyout("load-flyout");
    }

    private fileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            this.props.onFileChanged(event.currentTarget.files[0]);
        }
    }

    private onSave = () => this.props.onSave();

    private onLoad = () => this.props.onLoad(this.props.fileToLoad);
}

function mapStateToProps(state: Store): Partial<Props> {
    return {
        fileToLoad : state.menu.load.file,
    };
}

let mapActionsToProps = ({
    onFileChanged : (file: File) => ({
        file,
        type: "load-file-changed",
    } as SaveLoadActions.FileChangedAction),
    onLoad : SaveLoadActions.loadThunkAction,
    onSave : SaveLoadActions.saveAsThunkAction,
    toggleFlyout : (id: string) => ({
        type: "flyout-toggle",
        id,
    } as FlyoutToggle),
});

export default connect(mapStateToProps, mapActionsToProps)(SaveLoadButtons);
