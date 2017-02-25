import * as React from "react";
import CoverPageDescription from "./CoverPageDescription";
import PageBreak from "./PageBreak";
import EditableHeading from "containers/editors/EditableHeading";

export interface CoverPageProps {
    date : Date;
}

const CoverPage = (props : CoverPageProps) => {
    return (
        <div>
            <div id="coverpage-title">
                <EditableHeading itemId={1} level={1} />
                <EditableHeading itemId={2} level={2} />
            </div>
            <CoverPageDescription date={props.date} />
            <PageBreak />
        </div>
    );
}

export default CoverPage;