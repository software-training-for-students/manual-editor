import AboutPage from "components/AboutPage";
import CoverPage from "components/CoverPage";
import TableOfContents from "containers/TableOfContents";
import ElementTypes from "ElementTypes";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";
import {ItemOrdering} from "stores/Document";

interface Props {
    items: ItemOrdering[];
}

class Manual extends React.Component<Props, void> {
    public render() {
        return (
            <div id="manual">
                <CoverPage date={new Date()} />
                <AboutPage />
                <TableOfContents />
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
        items: state.document.elementOrdering,
    };
}

export default connect(mapStateToProps)(Manual);
