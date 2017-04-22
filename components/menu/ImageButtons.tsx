import MenuItem from "containers/MenuItem";
import {SideBySideImage, SingleImage} from "core/ElementInfo";
import * as React from "react";

const defaultSingleImageValue: SingleImage = {
    value: {
        border: true,
        className: "full-width-image",
        source: "",
    },
};

function SingleImageButton() {
    return (
        <MenuItem
            menuItemId="single-images"
            menuItemText="Single Image"
            menuItemHeading="Create Single Image"
            insertEnabled
            items={[
                {
                    elementState: defaultSingleImageValue,
                    elementType: "SingleImage",
                },
            ]}
        />
    );
}

const defaultSideBySideImageValue: SideBySideImage = {
    value: {
        border: true,
        className: "sidebyside-image-large",
        leftSource: "",
        rightSource: "",
    },
};

function SideBySideImageButton() {
    return (
        <MenuItem
            menuItemId="sidebyside-images"
            menuItemText="Side By Side Images"
            menuItemHeading="Create Side By Side Images"
            insertEnabled
            items={[
                {
                    elementState: defaultSideBySideImageValue,
                    elementType: "SideBySideImage",
                },
            ]}
        />
    );
}

export default {
    SideBySideImageButton,
    SingleImageButton,
};
