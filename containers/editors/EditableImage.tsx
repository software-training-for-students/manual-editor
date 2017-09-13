import {createSimpleConnectedElementInfo} from "components/EditableElement";
import ImageEditor from "components/ImageEditor";
import * as Images from "components/Images";

export default {
    EditableSideBySideImage : createSimpleConnectedElementInfo(ImageEditor.SideBySideImageEditor, Images.SideBySideImages),
    EditableSingleImage : createSimpleConnectedElementInfo(ImageEditor.SingleImageEditor, Images.SingleImage),
};
