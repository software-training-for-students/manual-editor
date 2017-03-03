import {AddToDocument} from "actions/BaseEditActions";
import MenuItem from "containers/MenuItem";
import * as React from "react";
import {connect} from "react-redux";

interface Props {
    onCreate: (defaultProps: {value: string},
        ordering: "before" | "after" | "end") => void;
}

const HtmlButton = (props: Props) => {
    const onCreate = (ordering: "before" | "after" | "end") => {
        props.onCreate({ value : ""}, ordering);
    };

    return <MenuItem
        insertEnabled
        menuItemText="Raw HTML"
        menuItemHeading="Create Raw HTML Block"
        menuItemId="raw-html"
        onCreate={onCreate}
    />;
};

const mapDispatchToProps = ({
    onCreate : (defaultProps: any, ordering: "before" | "after" | "end") => ({
        componentTypeName : "RawHtml",
        type : "addToDocument",
        defaultProps,
        ordering,
    } as AddToDocument),
});

export default connect(() => ({}), mapDispatchToProps)(HtmlButton);
