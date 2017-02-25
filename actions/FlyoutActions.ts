import {Action} from "redux";

export interface FlyoutToggle {
    type : "flyout-toggle";
    id? : string;
}