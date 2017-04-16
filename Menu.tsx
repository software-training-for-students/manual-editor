import CodeSnippetButton from "containers/menu/CodeSnippetButton";
import HeadingButton from "containers/menu/HeadingButton";
import ImageButtons from "containers/menu/ImageButtons";
import ImportButton from "containers/menu/ImportButton";
import * as ListButtons from "containers/menu/ListButtons";
import ListItemButton from "containers/menu/ListItemButton";
import ParagraphButton from "containers/menu/ParagraphButton";
import HtmlButton from "containers/menu/RawHtmlButton";
import SaveButton from "containers/menu/SaveButton";
import LoadButton from "containers/menu/LoadButton";
import SidebarNoteButton from "containers/menu/SidebarNoteButton";
import TableButton from "containers/menu/TableButton";
import ToolboxButton from "containers/menu/ToolboxButton";
import * as React from "react";

export default class Menu extends React.Component<void, void> {
    public render () {
        return (
            <div id="menu">
                <HeadingButton />
                <ImageButtons.SingleImageButton />
                <ImageButtons.SideBySideImageButton />
                <ParagraphButton />
                <HtmlButton />
                <CodeSnippetButton />
                <SidebarNoteButton />
                <ToolboxButton />
                <ListButtons.UnorderedListButton />
                <ListButtons.OrderedListButton />
                <ListButtons.InstructionListButton />
                <ListItemButton />
                <TableButton />
                <div>
                    <SaveButton />
                    <LoadButton />
                    <ImportButton />
                </div>
            </div>
        );
    }
}
