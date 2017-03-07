import * as React from "react";

export type SingleImageCssClass =
    "centered-image-tiny"
    | "centered-image-small"
    | "centered-image-medium"
    | "centered-image-large"
    | "full-width-image"
    | "side-image-small"
    | "side-image-medium"
    | "side-image-large"
    | "sidebar-icon";

export type SideBySideImageCssClass =
    "sidebyside-image-small"
    | "sidebyside-image-large";

interface SingleImageComponentProps {
    value: SingleImageProps | undefined;
    onClick?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export interface SingleImageProps {
        className: SingleImageCssClass;
        border?: boolean;
        source: string;
        caption?: string;
}

interface SideBySideImageComponentProps {
    value: SideBySideImageProps | undefined;
    onClick: (e: React.SyntheticEvent<HTMLDivElement>) => void;
}

export interface SideBySideImageProps {
        className: SideBySideImageCssClass;
        border?: boolean;
        leftSource: string;
        rightSource: string;
        caption?: string;
}

export class SingleImage extends React.Component<SingleImageComponentProps, void> {

    public render() {
        let value = this.props.value || {
            border: false,
            caption: "",
            className: "full-width-image",
            source: "",
        };
        return (
        <div className={value.className + (value.border ? " border" : "")}>
            <img src={value.source} onClick={this.onClick} />
            <p>{value.caption}</p>
         </div>);
    }

    private onClick = (event: React.SyntheticEvent<HTMLImageElement>) => {
        if (this.props.onClick) {
          this.props.onClick(event);
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
export class SideBySideImages extends React.Component<SideBySideImageComponentProps, void> {

    public render() {
        let value = this.props.value || {
            border: false,
            caption: "",
            className: "sidebyside-image-large",
            leftSource: "",
            rightSource: "",
        };
        return (
        <div className={value.className + (value.border ? " border" : "")} onClick={this.onClick}>
            <img src={value.leftSource} />
            <img src={value.rightSource} />
            <p>{value.caption}</p>
         </div>);
    }

    private onClick = (event: React.SyntheticEvent<HTMLDivElement>) =>
        this.props.onClick(event);

}
