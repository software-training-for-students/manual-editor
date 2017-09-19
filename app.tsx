import AboutPage from "components/AboutPage";
import CoverPage from "components/CoverPage";
import * as Branding from "core/branding";
import renderEditorInto from "core/renderEditor";
import * as React from "react";
import "./styles.css";

Branding.setBranding([
    <CoverPage date={new Date()} />,
    <AboutPage />,
]);

renderEditorInto(document.getElementById("root"));
