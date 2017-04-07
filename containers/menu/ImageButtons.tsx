import MenuItem from "containers/MenuItem";
import * as React from "react";

class SingleImageButton extends React.Component<void, void> {
    private defaultValue = {value: {border: true, className: "full-width-image"}};

    public render() {
        return (
            <MenuItem
                menuItemId="single-images"
                menuItemText="Single Image"
                menuItemHeading="Create Single Image"
                insertEnabled
                items={[
                    {
                        componentTypeName: "SingleImage",
                        defaultProps: {
                            language: this.defaultValue,
                            value: "",
                        },
                    },
                ]}
            />
        );
    }
}

// tslint:disable-next-line:max-classes-per-file
class SideBySideImageButton extends React.Component<void, void> {
    private defaultValue = {value: {border: true, className: "sidebyside-image-large"}};

    public render() {
        return (
            <MenuItem
                menuItemId="sidebyside-images"
                menuItemText="Side By Side Images"
                menuItemHeading="Create Side By Side Images"
                insertEnabled
                items={[
                    {
                        componentTypeName: "SideBySideImage",
                        defaultProps: {
                            language: this.defaultValue,
                            value: "",
                        },
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
