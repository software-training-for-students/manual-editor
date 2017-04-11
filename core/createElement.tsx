import * as Lists from "components/Lists";
import Table from "components/Table";
import TableCell from "components/TableCell";
import TableHeader from "components/TableHeader";
import TableRow from "components/TableRow";
import EditableCode from "containers/editors/EditableCode";
import EditableHeading from "containers/editors/EditableHeading";
import EditableHtml from "containers/editors/EditableHtml";
import EditableImage from "containers/editors/EditableImage";
import EditableListItem from "containers/editors/EditableListItem";
import EditableRichText from "containers/editors/EditableRichText";
import EditableSidebarNote from "containers/editors/EditableSidebarNote";
import EditableToolbox from "containers/editors/EditableToolbox";
import * as React from "react";
import removable from "components/higher-order/removable";
import { ItemTree } from "./../stores/Document";

type EditableProps = {
    itemId: number;
    items?: ItemTree[];
};

interface ElementTypes {
    [name: string]: React.ComponentClass<EditableProps> | React.StatelessComponent<EditableProps>;
}

let elementTypes: ElementTypes = {
    ["Heading"] : removable(EditableHeading),
    ["SingleImage"] : removable(EditableImage.EditableSingleImage),
    ["SideBySideImage"] : removable(EditableImage.EditableSideBySideImage),
    ["RichText"] : removable(EditableRichText),
    ["RawHtml"] : removable(EditableHtml),
    ["Code"] : removable(EditableCode),
    ["SidebarNote"] : removable(EditableSidebarNote),
    ["Toolbox"]: removable(EditableToolbox),
    ["UnorderedList"] : Lists.UnorderedList,
    ["OrderedList"] : Lists.OrderedList,
    ["InstructionList"] : Lists.InstructionList,
    ["ListItem"] : removable(EditableListItem),
    ["Table"] : removable(Table),
    ["TableRow"] : TableRow,
    ["TableCell"] : TableCell,
    ["TableHeader"] : TableHeader,
};

function createElement(props: ItemTree) {
    const Element = elementTypes[props.elementType];
    return <Element itemId={props.itemId} key={props.itemId} items={props.items} />;
}

export default createElement;
