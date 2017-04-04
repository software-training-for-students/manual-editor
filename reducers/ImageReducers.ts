import * as ImageActions from "actions/ImageActions";
import * as ImagesStore from "stores/Images";

export default function(store: ImagesStore.ImagesStore = ImagesStore.initialState, action: ImageActions.UploadImage) {
    if (action.type === "uploadImage") {
        return ImagesStore.addOrUpdateBlobImageToStore(store, action.image.name, action.image);
    }
    return store;
}
