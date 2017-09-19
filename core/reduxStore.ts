import reducer from "reducers";
import * as Redux from "redux";
import * as ReduxDevTools from "redux-devtools-extension";
import ReduxThunkMiddleware from "redux-thunk";
import {Store} from "stores";

declare const DEBUG: boolean;

let enhancer: Redux.StoreEnhancer<Store>;

if (DEBUG) {
    enhancer = ReduxDevTools.composeWithDevTools(Redux.applyMiddleware(ReduxThunkMiddleware));
} else {
    enhancer = Redux.applyMiddleware(ReduxThunkMiddleware);
}

const store = Redux.createStore<Store>(reducer, enhancer);
export default store;
