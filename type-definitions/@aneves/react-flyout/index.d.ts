import * as React from "react";

export declare interface Options {
        type? : "tooltip" | "menu";
        fixed? : boolean;
        mobile? : boolean;
        align? : string;
        dropdownIconsLeft? : boolean;
        dropdownIconsRight? : boolean;
        theme? : string;
}

export declare interface Props {
    id : string | null;
    options? : Options;
}

declare class Flyout extends React.Component<Props> {}

export declare interface WrapperProps {
    id : string | null;
    open? : boolean;
    options? : Options;
}

interface WrapperDispatchProps {
    onWindowClick : () => void;
}

declare class FlyoutWrapper extends React.Component<WrapperProps & WrapperDispatchProps>{}

export default FlyoutWrapper;