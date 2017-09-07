import {FileChangedAction, loadThunkAction} from "actions/SaveLoadActions";
import * as React from "react";
import ActivityIndicator from "react-activity-indicator";
import "react-activity-indicator/src/activityindicator.css";
import {connect} from "react-redux";
import {compose} from "redux";
import connectDialog from "redux-dialog-extended";
import {Store} from "stores";

interface Props {
    fileToLoad?: File;
    loading: boolean;
    onRequestClose: () => void;
    onFileChanged: (file: File) => void;
    onLoad: (file: File) => void;
}

class LoadWizard extends React.Component<Props, {}> {
    public render() {
        if (this.props.loading) {
            return (
                <div style={contentContainerStyle}>
                    <ActivityIndicator duration={100} />
                </div>
            );
        } else {
            return (
                <div style={contentContainerStyle}>
                    <button onClick={this.props.onRequestClose}>Close</button>
                    <header>Load STS Manual File</header>
                    <input type="file" accept=".uwstsmanual" onChange={this.fileChanged} />
                    <button disabled={!this.props.fileToLoad} onClick={this.onLoad}>Load</button>
                </div>
            );
        }
    }

    private fileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            this.props.onFileChanged(event.currentTarget.files[0]);
        }
    }

    private onLoad = () => {
        if (this.props.fileToLoad) {
            this.props.onLoad(this.props.fileToLoad);
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
        fileToLoad: store.menu.load.file,
        loading: store.menu.load.loading,
    };
}

const mapActionsToProps = ({
    onFileChanged : (file: File) => ({
        file,
        type: "load-file-changed",
    } as FileChangedAction),
    onLoad: loadThunkAction,
});

export default compose(connectDialog({
    contentLabel: "Load Wizard",
    name: "load-wizard",
    shouldCloseOnOverlayClick: false,
    style: {
        overlay:
        {
            zIndex: 100,
        },
    },
}), connect(mapStateToProps, mapActionsToProps))(LoadWizard);
