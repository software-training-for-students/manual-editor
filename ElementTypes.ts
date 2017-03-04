import EditableCode from "containers/editors/EditableCode";
import EditableHeading from "containers/editors/EditableHeading";
import EditableHtml from "containers/editors/EditableHtml";
import EditableImage from "containers/editors/EditableImage";
import EditableRichText from "containers/editors/EditableRichText";
import {ComponentClass, StatelessComponent} from "react";

interface ElementTypes {
    [name: string]: ComponentClass<any> | StatelessComponent<any>;
}

let instance: ElementTypes = {
    ["Heading"] : EditableHeading,
    ["SingleImage"] : EditableImage.EditableSingleImage,
    ["SideBySideImage"] : EditableImage.EditableSideBySideImage,
    ["RichText"] : EditableRichText,
    ["RawHtml"] : EditableHtml,
    ["Code"] : EditableCode,
};
export default instance;
