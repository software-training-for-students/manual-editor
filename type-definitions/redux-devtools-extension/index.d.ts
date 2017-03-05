import * as Redux from "redux";

declare function devToolsEnhancer<S>(options : any) : Redux.StoreEnhancer<S>;
declare var composeWithDevTools : typeof Redux.compose;