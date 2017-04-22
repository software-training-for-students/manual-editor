import MenuItem from "containers/MenuItem";
import {SingleImage, SideBySideImage} from "core/ElementInfo";
import * as React from "react";

class SingleImageButton extends React.Component<void, void> {
    private static defaultValue: SingleImage = {
        value: {
            border: true,
            className: "full-width-image",
            source: "",
        },
    };

    public render() {
        return (
            <MenuItem
                menuItemId="single-images"
                menuItemText="Single Image"
                menuItemHeading="Create Single Image"
                insertEnabled
                items={[
                    {
                        elementState: SingleImageButton.defaultValue,
                        elementType: "SingleImage",
                    },
                ]}
            />
        );
    }
}

// tslint:disable-next-line:max-classes-per-file
class SideBySideImageButton extends React.Component<void, void> {
    private static defaultValue: SideBySideImage = {
        value: {
            border: true,
            className: "sidebyside-image-large",
            leftSource: "",
            rightSource: "",
        }
    };

    public render() {
        return (
            <MenuItem
                menuItemId="sidebyside-images"
                menuItemText="Side By Side Images"
                menuItemHeading="Create Side By Side Images"
                insertEnabled
                items={[
                    {
                        elementState: SideBySideImageButton.defaultValue,
                        elementType: "SideBySideImage",
                    },
                ]}
            />
        );
    }
}

export default {
    SideBySideImageButton,
    SingleImageButton,
};
