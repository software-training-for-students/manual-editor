import { FlyoutOptions } from './FlyoutActions';
import {Action} from "redux";

export interface FlyoutToggle {
    type : "flyout-toggle";
    id? : string;
}

export interface FlyoutOptions {
    type : "flyout-options";
    options : FlyoutOptions;
}