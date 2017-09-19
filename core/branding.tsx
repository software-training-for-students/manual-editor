import PageBreak from "components/PageBreak";
import * as React from "react";

let branding: React.ReactNode = <PageBreak />;

export function getBranding() {
    return branding;
}

export function setBranding(newBranding: React.ReactNode) {
    branding = newBranding;
}
