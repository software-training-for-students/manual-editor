import heading from "reducers/menu/HeadingReducers";
import {sideBySideImage, singleImage} from "reducers/menu/ImageReducers";
import * as Redux from "redux";

export default Redux.combineReducers({heading, singleImage, sideBySideImage});
