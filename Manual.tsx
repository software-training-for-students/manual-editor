import * as React from "react";
import CoverPage from "./components/CoverPage";
import AboutPage from "./components/AboutPage";
import * as Store from "./DocumentStore";
import ElementTypes from "./ElementTypes";
import {connect} from "react-redux";

class Manual extends React.Component<{items: Store.ItemOrdering[]}, void> {
    public render() {
        return (
            <div>
                <CoverPage date={new Date()} />
                <AboutPage />
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

function mapStateToProps(state : Store.Document) : {items : Store.ItemOrdering[]} {
    return {
        items: state.elementOrdering
    }
}

export default connect(mapStateToProps)(Manual);