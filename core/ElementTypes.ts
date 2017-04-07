import EditableCode from "containers/editors/EditableCode";
import EditableHeading from "containers/editors/EditableHeading";
import EditableHtml from "containers/editors/EditableHtml";
import EditableImage from "containers/editors/EditableImage";
import EditableRichText from "containers/editors/EditableRichText";
import EditableSidebarNote from "containers/editors/EditableSidebarNote";
import EditableToolbox from "containers/editors/EditableToolbox";
import {ComponentClass, StatelessComponent} from "react";
import { ItemTree } from "./../stores/Document";

type EditableProps = {
    itemId: number;
    items?: ItemTree[];
};

interface ElementTypes {
    [name: string]: ComponentClass<EditableProps> | StatelessComponent<EditableProps>;
}

let instance: ElementTypes = {
    ["Heading"] : EditableHeading,
    ["SingleImage"] : EditableImage.EditableSingleImage,
    ["SideBySideImage"] : EditableImage.EditableSideBySideImage,
    ["RichText"] : EditableRichText,
    ["RawHtml"] : EditableHtml,
    ["Code"] : EditableCode,
    ["SidebarNote"] : EditableSidebarNote,
    ["Toolbox"]: EditableToolbox,
};
export default instance;
