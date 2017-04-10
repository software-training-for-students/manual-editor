import {UpdateTableColumns, UpdateTableRows} from "actions/MenuActions";
import { combineReducers } from "redux";
import {initialState} from "stores";

function rows(rows: number = initialState.menu.table.rows, action: UpdateTableRows) {
    if (action.type === "update-table-rows") {
        return action.rows;
    }
    return rows;
}

function columns(columns: number = initialState.menu.table.columns, action: UpdateTableColumns) {
    if (action.type === "update-table-columns") {
        return action.columns;
    }
    return columns;
}

export default combineReducers({rows, columns});
