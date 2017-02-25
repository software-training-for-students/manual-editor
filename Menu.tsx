import * as React from "react";
import HeaderButton from "containers/menu/HeaderButton";

export default class Menu extends React.Component<void, void> {
    public render () {
        return (
            <div id="menu">
                <HeaderButton />
            </div>
        );
    }
}