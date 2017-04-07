import AboutPage from "components/AboutPage";
import CoverPage from "components/CoverPage";
import TableOfContents from "containers/TableOfContents";
import ElementTypes from "core/ElementTypes";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";
import {ItemTree} from "stores/Document";

interface Props {
    items: ItemTree[];
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
                            return <ElementType itemId={item.itemId} key={item.itemId} items={item.items} />;
                        },
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state: Store): Props {
    let itemTree: ItemTree = {
        elementType: "Manual",
        itemId: -1,
        items: [],
    };

    let treeStack: ItemTree[] = [itemTree];

    state.document.elementOrdering.forEach((item) => {
        let topTree = treeStack[treeStack.length - 1];
        if (item.metaItemType === "open") {
            let newSubTree = {... item, items: []};
            topTree.items.push(newSubTree);
            treeStack.push(newSubTree);
        } else if (item.metaItemType === "close") {
            if (topTree.elementType !== item.elementType) {
                throw new Error("Mismatched closing element type");
            }
            treeStack.pop();
        } else {
            topTree.items.push({... item, items: []});
        }
    });

    if (treeStack[0] !== itemTree) {
        throw new Error("Mismatched element tree.");
    }

    return { items: itemTree.items };
}

export default connect(mapStateToProps)(Manual);
