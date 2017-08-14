import * as React from "react";
import {Reducer, ActionCreator, Action} from "redux";
import * as Modal from "react-modal";

interface DialogProps extends Partial<Modal.Props> {
    name: string;
}

interface Store {
    [name: string]: boolean;
}

export declare var dialogReducer: Reducer<Store>;

export function openDialog(name: string): ActionCreator<Action>;
export function closeDialog(name: string): ActionCreator<Action>;

type DialogDecorator<TProps> = (component: React.ComponentClass<TProps> | React.StatelessComponent<TProps>) => React.ComponentClass<TProps> | React.StatelessComponent<TProps>;

export default function<TProps>(props: DialogProps): DialogDecorator<TProps>;
