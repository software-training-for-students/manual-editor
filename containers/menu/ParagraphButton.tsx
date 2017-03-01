import * as React from "react";
import {connect} from "react-redux";
import {EditorState} from "draft-js";
import MenuItem from "containers/MenuItem";
import {AddToDocument} from "actions/BaseEditActions";

interface Props {
    onCreate : (defaultProps : {value : EditorState},
        ordering: "before" | "after" | "end") => void
}

const ParagraphButton = (props: Props) => {
    const onCreate = (ordering : "before" | "after" | "end") => {
        props.onCreate({ value : EditorState.createEmpty()}, ordering);
    }

    return <MenuItem insertEnabled menuItemText="Paragraph" menuItemHeading="Create Paragraph" menuItemId="paragraph"
        onCreate={onCreate} />
}

const mapDispatchToProps = ({
    onCreate : (defaultProps : any, ordering : "before" | "after" | "end") => ({
        type : "addToDocument",
        componentTypeName : "RichText",
        defaultProps : defaultProps,
        ordering : ordering
    } as AddToDocument)
});

export default connect(() => ({}), mapDispatchToProps)(ParagraphButton);