import EditableHeading from "containers/editors/EditableHeading";
import TableOfContents from "containers/TableOfContents";
import createElement from "core/createElement";
import {isItemTreeLeaf, isLegacyItemOrdering, isMetaItemOrdering, ItemOrdering, ItemTree} from "core/ItemTree";
import * as React from "react";
import {connect} from "react-redux";
import {Store} from "stores";

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
                <div id="coverpage-title">
                    <EditableHeading itemId={1} />
                    <EditableHeading itemId={2} />
                    <h3><em>Classroom Course Material</em></h3>
                </div>
                {this.props.children}
                <TableOfContents />
                {createElement(this.state.tree)}
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
        const topTree = treeStack[treeStack.length - 1];
        if (isLegacyItemOrdering(item)) {
            throw new Error(`Cannot present a ${item.elementType} item in this version of the editor.`);
        }
        if (isItemTreeLeaf(topTree)) {
            // Note: this should be impossible but with this Typescript can ensure
            // that our logic below is correct within the type system.
            throw new Error("Top tree on the stack is a leaf element (does not have children).");
        } else if (isMetaItemOrdering(item)) {
            if (item.metaItemType === "open") {
                let newSubTree = {... item, items: []};
                topTree.items.push(newSubTree);
                treeStack.push(newSubTree);
            } else if (item.metaItemType === "close") {
                if (topTree.elementType !== item.elementType) {
                    throw new Error("Mismatched closing element type");
                }
                if (topTree.itemId !== item.itemId) {
                    throw new Error("Mismatched closing item id");
                }
                treeStack.pop();
            }
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

export default connect(mapStateToProps, {})(Manual);
