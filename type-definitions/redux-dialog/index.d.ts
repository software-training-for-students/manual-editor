import * as React from "react";
import {Reducer, ActionCreator, Action} from "redux";
import {ComponentDecorator} from "react-redux";

interface DialogProps {
    name: string;
}

interface Store {
    [name: string]: boolean;
}

export declare var dialogReducer: Reducer<Store>;

export function openDialog(name: string): ActionCreator<Action>;
export function closeDialog(name: string): ActionCreator<Action>;

export default function<TProps>(props: DialogProps): ComponentDecorator<TProps, TProps>;
