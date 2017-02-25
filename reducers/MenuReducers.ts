import * as Redux from "redux";
import {MenuStore, initialState} from "stores/Menu";
import heading from "reducers/menu/HeadingReducers";


export default Redux.combineReducers({heading});