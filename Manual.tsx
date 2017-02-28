import * as React from "react";
import CoverPage from "components/CoverPage";
import AboutPage from "components/AboutPage";
import TableOfContents from "components/TableOfContents";
import {ItemOrdering} from "stores/Document";
import {Store} from "stores";
import ElementTypes from "ElementTypes";
import {connect} from "react-redux";

interface Props {
    items : ItemOrdering[];
    headings : string[];
}

class Manual extends React.Component<Props, void> {
    public render() {
        return (
            <div id="manual">
                <CoverPage date={new Date()} />
                <AboutPage />
                <TableOfContents headings={this.props.headings} />
                {
                    this.props.items.map(
                        (item) => {
                            const ElementType = ElementTypes[item.elementType];
                            return <ElementType itemId={item.itemId} key={item.itemId} />
                        }
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state : Store) : Props {
    return {
        items: state.document.elementOrdering.slice(),
        headings : state.document.elementOrdering.filter(element =>
                        element.elementType === "Heading" && state.document[element.itemId].level === 1
                    ).map(element => state.document[element.itemId].value)
    }
}

export default connect(mapStateToProps)(Manual);