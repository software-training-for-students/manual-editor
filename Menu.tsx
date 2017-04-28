import ImageButtons from "components/menu/ImageButtons";
import KeyboardShortcutButton from "components/menu/KeyboardShortcutButton";
import * as ListButtons from "components/menu/ListButtons";
import ListItemButton from "components/menu/ListItemButton";
import ParagraphButton from "components/menu/ParagraphButton";
import HtmlButton from "components/menu/RawHtmlButton";
import SidebarNoteButton from "components/menu/SidebarNoteButton";
import ToolboxButton from "components/menu/ToolboxButton";
import CodeSnippetButton from "containers/menu/CodeSnippetButton";
import HeadingButton from "containers/menu/HeadingButton";
import ImportButton from "containers/menu/ImportButton";
import LoadButton from "containers/menu/LoadButton";
import SaveButton from "containers/menu/SaveButton";
import TableButton from "containers/menu/TableButton";
import * as React from "react";

export default function Menu () {
    return (
        <div id="menu">
            <HeadingButton />
            <ImageButtons.SingleImageButton />
            <ImageButtons.SideBySideImageButton />
            <ParagraphButton />
            <HtmlButton />
            <CodeSnippetButton />
            <SidebarNoteButton />
            <KeyboardShortcutButton />
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
