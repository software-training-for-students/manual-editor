import * as React from "react";
import * as ReactDOM from "react-dom";
import CoverPage from "./CoverPage";
import AboutPage from "./AboutPage";

ReactDOM.render(<div><CoverPage title={"Empty Manual Template"}
     subtitle={"Small Tagline Description Here"} date={new Date()} />
     <AboutPage /></div>,
document.getElementById("root"));