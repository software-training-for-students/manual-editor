import {ComponentClass, StatelessComponent} from "react";
import EditableHeading from "./components/EditableHeading";
import EditableImage from "./components/EditableImage";

interface ElementTypes {
    [name : string] : ComponentClass<any> | StatelessComponent<any>;
}

var instance : ElementTypes = {
    ["Heading"] : EditableHeading,
    ["SingleImage"] : EditableImage.EditableSingleImage
};
export default instance;