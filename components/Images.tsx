import SmartImagePresenter from "containers/SmartImagePresenter";
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
    value: SingleImageProps;
    onClick?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
}

export interface SingleImageProps {
        className: SingleImageCssClass;
        border?: boolean;
        source: string;
        caption?: string;
}

interface SideBySideImageComponentProps {
    value: SideBySideImageProps ;
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
        <div onClick={this.onClick}>
            {value.className.startsWith("side") ? (
                <span className="edit-hint">
                    Click here to edit image below.
                </span>
            ) : null}
            <div className={value.className + (value.border ? " border" : "")}>
                <SmartImagePresenter src={value.source} />
                <p>{value.caption}</p>
            </div>
         </div>);
    }

    private onClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
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
            <SmartImagePresenter src={value.leftSource} />
            <SmartImagePresenter src={value.rightSource} />
            <p>{value.caption}</p>
         </div>);
    }

    private onClick = (event: React.SyntheticEvent<HTMLDivElement>) =>
        this.props.onClick(event);

}
