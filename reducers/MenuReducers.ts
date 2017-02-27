import * as Redux from "redux";
import {MenuStore, initialState} from "stores/Menu";
import heading from "reducers/menu/HeadingReducers";
import {singleImage, sideBySideImage} from "reducers/menu/ImageReducers";


export default Redux.combineReducers({heading, singleImage, sideBySideImage});