import { SideBySideImageProps, SingleImageProps } from "components/Images";
import * as Redux from "redux";
import {initialState} from "stores/Menu";
import { UpdateSideBySideImageProps, UpdateSingleImageProps } from "./../../actions/MenuActions";

export let singleImage: Redux.Reducer<SingleImageProps>  = (store: SingleImageProps = initialState.singleImage, action: UpdateSingleImageProps) => {
    if (action.type === "update-single-image-props") {
        let newStore = {
            ... store,
            ... action.props,
        };
        return newStore;
    }
    return store;
};

export let sideBySideImage: Redux.Reducer<SideBySideImageProps>  = (store: SideBySideImageProps = initialState.sideBySideImage, action: UpdateSideBySideImageProps) => {
    if (action.type === "update-sidebyside-image-props") {
        let newStore = {
            ... store,
            ... action.props,
        };
        return newStore;
    }
    return store;
};
