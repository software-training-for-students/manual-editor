import {AddToDocument} from "actions/BaseEditActions";
import MenuItem from "containers/MenuItem";
import {EditorState} from "draft-js";
import * as React from "react";
import {connect} from "react-redux";

interface Props {
    onCreate: (defaultProps: {value: EditorState},
        ordering: "before" | "after" | "end") => void;
}

const ParagraphButton = (props: Props) => {
    const onCreate = (ordering: "before" | "after" | "end") => {
        props.onCreate({ value : EditorState.createEmpty()}, ordering);
    };

    return <MenuItem
        insertEnabled
        menuItemText="Paragraph"
        menuItemHeading="Create Paragraph"
        menuItemId="paragraph"
        onCreate={onCreate}
    />;
};

const mapDispatchToProps = ({
    onCreate : (defaultProps: any, ordering: "before" | "after" | "end") => ({
        componentTypeName : "RichText",
        type : "addToDocument",
        defaultProps,
        ordering,
    } as AddToDocument),
});

export default connect(() => ({}), mapDispatchToProps)(ParagraphButton);
