import * as React from "react";
import {connect} from "react-redux";
import {EditorState} from "draft-js";
import MenuItem from "containers/MenuItem";
import {AddToDocument} from "actions/BaseEditActions";

interface Props {
    onCreate : (defaultProps : {value : string},
        ordering: "before" | "after" | "end") => void
}

const HtmlButton = (props: Props) => {
    const onCreate = (ordering : "before" | "after" | "end") => {
        props.onCreate({ value : ""}, ordering);
    }

    return <MenuItem insertEnabled menuItemText="Raw HTML" menuItemHeading="Create Raw HTML Block" menuItemId="raw-html"
        onCreate={onCreate} />
}

const mapDispatchToProps = ({
    onCreate : (defaultProps : any, ordering : "before" | "after" | "end") => ({
        type : "addToDocument",
        componentTypeName : "RawHtml",
        defaultProps : defaultProps,
        ordering : ordering
    } as AddToDocument)
});

export default connect(() => ({}), mapDispatchToProps)(HtmlButton);