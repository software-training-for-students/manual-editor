import { UpdateSingleImageProps } from './../../actions/MenuActions';
import { SingleImageProps } from 'components/Images';
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