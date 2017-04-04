import {Action} from "redux";

export interface UploadImage extends Action {
    type: "uploadImage";
    image: File;
}
