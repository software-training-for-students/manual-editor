import {saveAsThunkAction} from "actions/SaveLoadActions";
import * as React from "react";
import {connect} from "react-redux";

interface Props {
    onSave: () => void;
}

const SaveButton = (props: Props) => {
    return <button onClick={props.onSave}>Save</button>;
};

let mapActionsToProps = ({
    onSave : saveAsThunkAction,
});

export default connect(undefined, mapActionsToProps)(SaveButton);
