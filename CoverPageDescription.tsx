import * as React from "react";


export interface CoverPageProps {
    date : Date;
}

export class CoverPageDescription extends React.Component<CoverPageProps, void> {
    public render() {
        return (
        <div id="coverpage-description">
            <img src="http://software-training-for-students.github.io/manual-master-files/uwlogo.png" />
            <p>Written, designed, and produced by</p>
            <p>DoIT Software Training for Students</p>
            <p><em>Last Updated {this.props.date.toDateString()}</em></p>
        </div>);
    }
}