import * as FlyoutActions from "actions/FlyoutActions";
import {FlyoutStore, initialState} from "stores/Flyout";

export default function(state : FlyoutStore = initialState, action : FlyoutActions.FlyoutToggle) {
    if(action.type === "flyout-toggle") {
       let s : boolean;
       if(!state.id || state.id === action.id) { // first toggle / same flyout : toggle
           s = !state.open;
       } else if (action.id === undefined) { // window click: close
           s = false;
       } else { // different flyout : open
           s = true;
       }
       return {
           ... state,
           id : action.id,
           open : s
       }
    }
    return state;
}