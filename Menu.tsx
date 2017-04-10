import CodeSnippetButton from "containers/menu/CodeSnippetButton";
import HeadingButton from "containers/menu/HeadingButton";
import ImageButtons from "containers/menu/ImageButtons";
import * as ListButtons from "containers/menu/ListButtons";
import ListItemButton from "containers/menu/ListItemButton";
import ParagraphButton from "containers/menu/ParagraphButton";
import HtmlButton from "containers/menu/RawHtmlButton";
import SaveLoadButtons from "containers/menu/SaveLoadButtons";
import SidebarNoteButton from "containers/menu/SidebarNoteButton";
import ToolboxButton from "containers/menu/ToolboxButton";
import TableButton from "containers/menu/TableButton";
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
                <SaveLoadButtons />
            </div>
        );
    }
}
