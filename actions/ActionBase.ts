import {Action} from "redux";

interface ActionBase extends Action {
    itemId: number;
}

export default ActionBase;