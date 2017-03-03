import AboutPage from "components/AboutPage";
import CoverPage from "components/CoverPage";
import TableOfContents from "components/TableOfContents";
import ElementTypes from "ElementTypes";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";
import {ItemOrdering} from "stores/Document";

interface Props {
    items: ItemOrdering[];
    headings: string[];
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
                            return <ElementType itemId={item.itemId} key={item.itemId} />;
                        },
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state: Store): Props {
    return {
        headings : state.document.elementOrdering.filter((element) =>
                        element.elementType === "Heading" && state.document[element.itemId].level === 1,
                    ).map((element) => state.document[element.itemId].value),
        items: state.document.elementOrdering.slice(),
    };
}

export default connect(mapStateToProps)(Manual);
