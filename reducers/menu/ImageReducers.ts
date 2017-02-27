import { UpdateSingleImageProps, UpdateSideBySideImageProps } from './../../actions/MenuActions';
import { SingleImageProps, SideBySideImageProps } from 'components/Images';
import {initialState} from "stores/Menu";
import * as Redux from "redux";

export var singleImage : Redux.Reducer<SingleImageProps>  = (store : SingleImageProps = initialState.singleImage, action : UpdateSingleImageProps) => {
    if(action.type == "update-single-image-props") {
        var newStore = {
            ... store,
            ... action.props
        };
        return newStore;
    }
    return store;
}

export var sideBySideImage : Redux.Reducer<SideBySideImageProps>  = (store : SideBySideImageProps = initialState.sideBySideImage, action : UpdateSideBySideImageProps) => {
    if(action.type == "update-sidebyside-image-props") {
        var newStore = {
            ... store,
            ... action.props
        };
        return newStore;
    }
    return store;
}