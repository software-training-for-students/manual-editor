import MenuItem from "containers/MenuItem";
import {EditorState} from "draft-js";
import * as React from "react";

class SidebarNoteButton extends React.Component<void, void> {
        public render() {
            return (
                <MenuItem
                    insertEnabled
                    menuItemHeading="Create Sidebar Note"
                    menuItemId="sidebar-note"
                    menuItemText="Sidebar Note"
                    defaultValue={{
                        value: {
                            content: EditorState.createEmpty(),
                            imgSource: "",
                            title: "",
                        },
                    }}
                    elementType="SidebarNote"
                />
            );
        }
}

export default SidebarNoteButton;
