import * as React from "react";
import CoverPageDescription from "./CoverPageDescription";
import PageBreak from "./PageBreak";

export interface CoverPageProps {
    date: Date;
}

const CoverPage = (props: CoverPageProps) => {
    return (
        <div>
            <CoverPageDescription date={props.date} />
            <PageBreak />
        </div>
    );
};

export default CoverPage;
