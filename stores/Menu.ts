import { SideBySideImageProps, SingleImageProps } from "components/Images";

export interface HeadingStore {
        level: 1 | 2 | 3 | 4 | 5 | 6;
        text: string;
}

export interface MenuStore {
    heading: HeadingStore;
    singleImage: SingleImageProps;
    sideBySideImage: SideBySideImageProps;
    code: {language: string};
}

export let initialState: MenuStore = {
    code : {
        language : "html-css-javascript",
    },
    heading : {
        level : 1,
        text : "",
    },
    sideBySideImage : {
        border : false,
        caption : "",
        className : "sidebyside-image-large",
        leftSource : "",
        rightSource : "",
    },
    singleImage : {
        border : false,
        caption : "",
        className: "full-width-image",
        source : "",
    },
};
