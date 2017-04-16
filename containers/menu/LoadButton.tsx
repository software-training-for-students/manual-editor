import {FlyoutToggle} from "actions/FlyoutActions";
import * as SaveLoadActions from "actions/SaveLoadActions";
import Flyout from "containers/Flyout";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";

interface Props {
    toggleFlyout: (id: string) => void;
    onLoad: (file: File) => void;
    onFileChanged: (file: File) => void;
    fileToLoad: File;
}

class LoadButton extends React.Component<Props, void> {
    public render() {
        return (
            <div className="has-flyout">
                <button data-flyout-id="load-flyout" onClick={this.toggleLoadFlyout}>Load</button>
                <Flyout id="load-flyout" options={{align: "bottom middle"}}>
                    <div>
                        <header>Load Manual</header>
                        <input type="file" accept=".uwstsmanual" onChange={this.fileChanged} />
                        <button onClick={this.onLoad}>Load</button>
                    </div>
                </Flyout>
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
    toggleFlyout : (id: string) => ({
        type: "flyout-toggle",
        id,
    } as FlyoutToggle),
});

export default connect(mapStateToProps, mapActionsToProps)(LoadButton);
