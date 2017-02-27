import {ComponentClass, StatelessComponent} from "react";
import EditableHeading from "containers/editors/EditableHeading";
import EditableImage from "containers/editors/EditableImage";

interface ElementTypes {
    [name : string] : ComponentClass<any> | StatelessComponent<any>;
}

var instance : ElementTypes = {
    ["Heading"] : EditableHeading,
    ["SingleImage"] : EditableImage.EditableSingleImage,
    ["SideBySideImage"] : EditableImage.EditableSideBySideImage
};
export default instance;