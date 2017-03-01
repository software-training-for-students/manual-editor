import * as React from "react";
import HeadingButton from "containers/menu/HeadingButton";
import ImageButtons from "containers/menu/ImageButtons";
import ParagraphButton from "containers/menu/ParagraphButton";

export default class Menu extends React.Component<void, void> {
    public render () {
        return (
            <div id="menu">
                <HeadingButton />
                <ImageButtons.SingleImageButton />
                <ImageButtons.SideBySideImageButton />
                <ParagraphButton />
            </div>
        );
    }
}