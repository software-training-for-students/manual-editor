import code from "reducers/menu/CodeBlockReducers";
import heading from "reducers/menu/HeadingReducers";
import {load} from "reducers/menu/SaveLoadReducers";
import table from "reducers/menu/TableReducers";
import * as Redux from "redux";

export default Redux.combineReducers({heading, code, load, table});
