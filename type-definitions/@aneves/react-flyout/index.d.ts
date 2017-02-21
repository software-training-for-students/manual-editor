import * as React from "react";

declare interface Options {
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

declare class Flyout extends React.Component<Props, void> {}

export declare interface WrapperProps {
    id : string | null;
    open? : boolean;
    options? : Options;
    onWindowClick? : () => void;
}

declare class FlyoutWrapper extends React.Component<WrapperProps, void>{}

export default FlyoutWrapper;