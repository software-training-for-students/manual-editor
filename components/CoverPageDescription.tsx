import * as React from "react";

export interface CoverPageProps {
    date: Date;
}

const CoverPageDescription = (props: CoverPageProps) => {
    return (
    <div id="coverpage-description">
        <img src="http://software-training-for-students.github.io/manual-master-files/uwlogo.png" />
        <p>Written, designed, and produced by</p>
        <p>DoIT Software Training for Students</p>
        <p><em>Last Updated {props.date.toDateString()}</em></p>
    </div>);
};

export default CoverPageDescription;
