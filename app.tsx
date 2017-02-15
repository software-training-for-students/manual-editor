import * as React from "react";
import * as ReactDOM from "react-dom";
import * as CoverPage from "./CoverPage";
import * as AboutPage from "./AboutPage";

ReactDOM.render(<div><CoverPage.CoverPage title={"Empty Manual Template"}
     subtitle={"Small Tagline Description Here"} date={new Date()} />
     <AboutPage.AboutPage /></div>,
document.getElementById("root"));