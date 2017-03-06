import {AddToDocument} from "actions/BaseEditActions";
import MenuItem from "containers/MenuItem";
import {EditorState} from "draft-js";
import * as React from "react";
import {connect} from "react-redux";

interface Value {
    title: string;
    content: EditorState;
    imgSource: string;
}

interface Props {
    onCreate: (defaultProps: {value: Value},
        ordering: "before" | "after" | "end") => void;
}

class SidebarNoteButton extends React.Component<Props, void> {
        public render() {
            return (
                <MenuItem
                    insertEnabled
                    menuItemHeading="Create Sidebar Note"
                    menuItemId="sidebar-note"
                    menuItemText="Sidebar Note"
                    onCreate={this.onCreate}
                />
            );
        }

        private onCreate = (ordering: "before" | "after" | "end") => {
            this.props.onCreate({
                value: {
                    content: EditorState.createEmpty(),
                    imgSource: "",
                    title: "Sidebar Title",
                },
            }, ordering);
        }
}

const mapDispatchToProps = ({
    onCreate : (defaultProps: any, ordering: "before" | "after" | "end") => ({
        componentTypeName : "SidebarNote",
        type : "addToDocument",
        defaultProps,
        ordering,
    } as AddToDocument),
});

export default connect(() => ({}), mapDispatchToProps)(SidebarNoteButton);
