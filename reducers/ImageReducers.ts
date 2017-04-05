import * as ImageActions from "actions/ImageActions";
import { ClearImagesAction } from "actions/SaveLoadActions";
import * as ImagesStore from "stores/Images";

export default function(store: ImagesStore.ImagesStore = ImagesStore.initialState, action: ImageActions.UploadImage | ClearImagesAction) {
    if (action.type === "uploadImage") {
        return ImagesStore.addOrUpdateBlobImageToStore(store, action.image.name, action.image);
    } else if (action.type === "clear-images") {
        return ImagesStore.emptyImagesStore(store);
    }
    return store;
}
