import {Action} from "redux";
import {SingleImageProps} from "components/Images";

export interface UpdateHeadingText extends Action {
    type : "update-heading-text";
    text : string
}

export interface UpdateHeadingLevel extends Action {
    type : "update-heading-level";
    level : 1 | 2 | 3 | 4 | 5 | 6;
}

export interface UpdateSingleImageProps extends Action {
    type : "update-single-image-props";
    props : SingleImageProps;
}