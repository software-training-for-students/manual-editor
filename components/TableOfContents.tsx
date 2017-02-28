import * as React from "react";
import PageBreak from "components/PageBreak";
import {connect} from "react-redux";
import {Store, initialState} from "stores";

interface Props {
    headings : string[];
}

class TableOfContents extends React.Component<Props, void> {
    public render() {
        return (
            <div>
                <h1 className="no-top-margin">Topics Outline</h1>
                <div id="outline">
                    <ol>
                        {
                            this.props.headings.map(heading => 
                                <li key={heading}><p>{heading}</p></li>
                            )
                        }
                    </ol>
                </div>
               <PageBreak />
            </div>
        );
    }
}

export default TableOfContents;