import { SingleImageProps, SideBySideImageProps } from 'components/Images';

export interface HeadingStore {
        level : 1 | 2 | 3 | 4 | 5 | 6;
        text : string;
}

export interface MenuStore {
    heading : HeadingStore;
    singleImage : SingleImageProps;
    sideBySideImage : SideBySideImageProps;
}

export var initialState : MenuStore = {
    heading : {
        level : 1,
        text : ""
    },
    singleImage : {
        source : "",
        className: "full-width-image",
        caption : "",
        border : false
    },
    sideBySideImage : {
        leftSource : "",
        rightSource : "",
        className : "sidebyside-image-large",
        caption : "",
        border : false
    }
};