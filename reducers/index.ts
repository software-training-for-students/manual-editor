import document from "reducers/DocumentReducers";
import flyout from "reducers/FlyoutReducers";
import images from "reducers/ImageReducers";
import menu from "reducers/MenuReducers";
import {combineReducers} from "redux";
import {Store} from "stores";

export default combineReducers<Store>({document, flyout, menu, images});
