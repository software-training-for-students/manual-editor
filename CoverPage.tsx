import * as React from "react";
import CoverPageDescription from "./CoverPageDescription";
import PageBreak from "./PageBreak";
import EditableHeaders from "./EditableHeaders";

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
                    <EditableHeaders.H1 text={this.props.title} itemId={1} />
                    <EditableHeaders.H2 text={this.props.subtitle} itemId={2} />
                </div>
                <CoverPageDescription date={this.props.date} />
                <PageBreak />
            </div>
        );
    }
}