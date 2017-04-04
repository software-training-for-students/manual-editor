interface ImageStore {
    image: Blob;
    imageUrl: string;
}

export interface ImagesStore {
    [friendlyUrl: string]: ImageStore;
}

export let initialState: ImagesStore = {};

export function emptyImagesStore(store: ImagesStore) {
    for (let key in store) {
        if (store.hasOwnProperty(key)) {
            let element = store[key];
            URL.revokeObjectURL(element.imageUrl);
            delete store[key];
        }
    }
}

export function addOrUpdateBlobImageToStore(store: ImagesStore, friendlyUrl: string, image: Blob): ImagesStore {
    let newStore = {... store};
    let imageUrl = URL.createObjectURL(image);
    newStore[friendlyUrl] = {image, imageUrl};
    return newStore;
}
