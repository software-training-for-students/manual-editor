import {UpdateTableColumns, UpdateTableRows} from "actions/MenuActions";
import MenuItem from "containers/MenuItem";
import {convertFromHTML} from "draft-js";
import * as React from "react";
import {connect} from "react-redux";
import {initialState, Store} from "stores";

type ItemInformation = {
    componentTypeName: string;
    defaultProps: any;
    metaItemType?: "open" | "close";
};

function generateItems(rows: number, columns: number): ItemInformation[] {
    let items: ItemInformation[] = [];
    items.push({
        componentTypeName: "Table",
        defaultProps: {},
        metaItemType: "open",
    });
    for (let i = 0; i < rows; i++) {
        items.push({
            componentTypeName: "TableRow",
            defaultProps: {},
            metaItemType: "open",
        });
        for (let j = 0; j < columns; j++) {
            items.push({
                componentTypeName: i === 0 ? "TableHeader" : "TableCell",
                defaultProps: {},
                metaItemType: "open",
            });
            items.push({
                componentTypeName: "RichText",
                defaultProps: {
                    value: {blocks: convertFromHTML("<p>Text</p>"), entityMap: {}},
                },
            });
            items.push({
                componentTypeName: i === 0 ? "TableHeader" : "TableCell",
                defaultProps: {},
                metaItemType: "close",
            });
        }
        items.push({
            componentTypeName: "TableRow",
            defaultProps: {},
            metaItemType: "close",
        });
    }
    items.push({
        componentTypeName: "Table",
        defaultProps: {},
        metaItemType: "close",
    });
    return items;
}

interface Props {
    rowsChanged?: (rows: number) => void;
    columnsChanged?: (columns: number) => void;
    rows: number;
    columns: number;
}

interface State {
    items: ItemInformation[];
}

class TableButton extends React.Component<Props, State> {
    constructor(props: Props, context?: any) {
        super(props, context);
        this.state = {
            items: generateItems(props.rows, props.columns),
        };
    }

    public componentWillReceiveProps(props: Props) {
        if (props.rows !== this.props.rows || props.columns !== this.props.columns) {
            this.setState({
                items: generateItems(props.rows, props.columns),
            });
        }
    }


    public render() {
        return (
        <MenuItem
            menuItemId="table"
            menuItemText="Table"
            menuItemHeading="Create Table"
            insertEnabled={this.props.rows > 0 && this.props.columns > 0}
            items={this.state.items}
            itemToEdit={3}
        >
            <section>
                <label htmlFor="table-rows">Rows:</label>
                <input type="number" value={this.props.rows} onChange={this.rowsChanged} />
            </section>
            <section>
                <label htmlFor="table-columns">Columns:</label>
                <input type="number" value={this.props.columns} onChange={this.columnsChanged} />
            </section>
        </MenuItem>
        );
    }

    private rowsChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.rowsChanged) {
            this.props.rowsChanged(parseInt(e.target.value, 10));
        }
    }

    private columnsChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.columnsChanged) {
            this.props.columnsChanged(parseInt(e.target.value, 10));
        }
    }
}

function mapStateToProps(state: Store = initialState): Props {
    return {
        columns: state.menu.table.columns,
        rows: state.menu.table.rows,
    };
}

let mapActionsToProps = ({
    columnsChanged: (columns: number) => ({
        columns,
        type: "update-table-columns",
    } as UpdateTableColumns),
    rowsChanged: (rows: number) => ({
        rows,
        type: "update-table-rows",
    } as UpdateTableRows),
});

export default connect(mapStateToProps, mapActionsToProps)(TableButton);
