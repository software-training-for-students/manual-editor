import { SingleImageProps } from 'components/Images';

export interface HeadingStore {
        level : 1 | 2 | 3 | 4 | 5 | 6;
        text : string;
}

export interface MenuStore {
    heading : HeadingStore;
    singleImage : SingleImageProps;
}

export var initialState : MenuStore = {
    heading : {
        level : 1,
        text : "Heading Text"
    },
    singleImage : {
        source : "",
        className: "full-width-image",
        caption : "",
        border : false
    }
};