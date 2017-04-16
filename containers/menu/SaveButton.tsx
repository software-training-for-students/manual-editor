import {saveAsThunkAction} from "actions/SaveLoadActions";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";

interface Props {
    onSave: () => void;
}

const SaveButton = (props: Props) => {
    return <button onClick={props.onSave}>Save</button>;
};

function mapStateToProps(state: Store) {
    return {};
}

let mapActionsToProps = ({
    onSave : saveAsThunkAction,
});

export default connect(mapStateToProps, mapActionsToProps)(SaveButton);
