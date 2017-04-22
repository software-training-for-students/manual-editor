import SmartImagePresenter from "containers/SmartImagePresenter";
import {SideBySideImage as SideBySideImageProps, SingleImage as SingleImageProps} from "core/ElementInfo";
import * as React from "react";

export function SingleImage({value}: SingleImageProps) {
    return (
        <div>
            {value.className.startsWith("side") ? (
                <span className="edit-hint">
                    Click here to edit image below.
                </span>
            ) : null}
            <div className={value.className + (value.border ? " border" : "")}>
                <SmartImagePresenter src={value.source} />
                <p>{value.caption}</p>
            </div>
         </div>
    );
}

export function SideBySideImages({value}: SideBySideImageProps) {
    return (
        <div className={value.className + (value.border ? " border" : "")}>
            <SmartImagePresenter src={value.leftSource} />
            <SmartImagePresenter src={value.rightSource} />
            <p>{value.caption}</p>
        </div>
    );
}
