import code from "reducers/menu/CodeBlockReducers";
import heading from "reducers/menu/HeadingReducers";
import {sideBySideImage, singleImage} from "reducers/menu/ImageReducers";
import {load} from "reducers/menu/SaveLoadReducers";
import * as Redux from "redux";

export default Redux.combineReducers({heading, singleImage, sideBySideImage, code, load});
