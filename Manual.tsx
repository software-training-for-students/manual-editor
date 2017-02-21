import * as React from "react";
import CoverPage from "./components/CoverPage";
import AboutPage from "./components/AboutPage";
import {ItemOrdering} from "./stores/Document";
import {Store} from "./stores";
import ElementTypes from "./ElementTypes";
import {connect} from "react-redux";

class Manual extends React.Component<{items: ItemOrdering[]}, void> {
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

function mapStateToProps(state : Store) : {items : ItemOrdering[]} {
    return {
        items: state.document.elementOrdering
    }
}

export default connect(mapStateToProps)(Manual);