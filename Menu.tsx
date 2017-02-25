import * as React from "react";
import HeadingButton from "containers/menu/HeadingButton";

export default class Menu extends React.Component<void, void> {
    public render () {
        return (
            <div id="menu">
                <HeadingButton />
            </div>
        );
    }
}