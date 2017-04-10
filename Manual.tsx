import AboutPage from "components/AboutPage";
import CoverPage from "components/CoverPage";
import TableOfContents from "containers/TableOfContents";
import createElement from "core/createElement";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";
import {ItemTree, ItemOrdering} from "stores/Document";

interface Props {
    items: ItemOrdering[];
}

interface State {
    tree: ItemTree;
}

class Manual extends React.Component<Props, State> {
    constructor(props: Props, context?: any) {
        super(props, context);
        this.state = {
            tree: createElementTree(props.items),
        };
    }

    public componentWillReceiveProps(props: Props) {
        this.setState({
            tree: createElementTree(props.items),
        });
    }

    public render() {
        return (
            <div id="manual">
                <CoverPage date={new Date()} />
                <AboutPage />
                <TableOfContents />
                {
                    this.state.tree.items.map(createElement)
                }
            </div>
        );
    }
}

function createElementTree(elementOrdering: ItemOrdering[]): ItemTree {
    let itemTree: ItemTree = {
        elementType: "Manual",
        itemId: -1,
        items: [],
    };

    let treeStack: ItemTree[] = [itemTree];

    elementOrdering.forEach((item) => {
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

    return itemTree;
}

function mapStateToProps(state: Store): Props {
    return {
        items: state.document.elementOrdering,
    };
}

export default connect(mapStateToProps)(Manual);
