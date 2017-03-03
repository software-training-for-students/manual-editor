import PageBreak from "components/PageBreak";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";

interface Props {
    headings: string[];
}

const TableOfContents = (props: Props) => {
    return (
        <div>
            <h1 className="no-top-margin">Topics Outline</h1>
            <div id="outline">
                <ol>
                    {
                        props.headings.map((heading) =>
                            <li key={heading}>
                                <p>{heading}</p>
                            </li>,
                        )
                    }
                </ol>
            </div>
            <PageBreak />
        </div>
    );
};

function mapStateToProps(state: Store) {
    return {
        headings: state.document.elementOrdering.filter((element) =>
                        element.elementType === "Heading" && state.document[element.itemId].level === 1,
                    ).map((element) => state.document[element.itemId].value),
    };
}

export default connect(mapStateToProps)(TableOfContents);
