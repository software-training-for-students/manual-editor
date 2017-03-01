import {ComponentClass, StatelessComponent} from "react";
import EditableHeading from "containers/editors/EditableHeading";
import EditableImage from "containers/editors/EditableImage";
import EditableRichText from "containers/editors/EditableRichText";

interface ElementTypes {
    [name : string] : ComponentClass<any> | StatelessComponent<any>;
}

var instance : ElementTypes = {
    ["Heading"] : EditableHeading,
    ["SingleImage"] : EditableImage.EditableSingleImage,
    ["SideBySideImage"] : EditableImage.EditableSideBySideImage,
    ["RichText"] : EditableRichText
};
export default instance;