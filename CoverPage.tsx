import * as React from "react";
import CoverPageDescription from "./CoverPageDescription";
import PageBreak from "./PageBreak";

export interface CoverPageProps {
    title : string;
    subtitle : string;
    date : Date;
}

export default class CoverPage extends React.Component<CoverPageProps, void> {
    public render() {
        return (
            <div>
                <div id="coverpage-title">
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.subtitle}</h2>
                </div>
                <CoverPageDescription date={this.props.date} />
                <PageBreak />
            </div>
        );
    }
}