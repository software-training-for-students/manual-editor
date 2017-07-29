import {isUpdateTableColumns, isUpdateTableRows} from "actions/MenuActions";
import { Action, combineReducers } from "redux";
import {initialState} from "stores";

function rows(rows: number = initialState.menu.table.rows, action: Action) {
    if (isUpdateTableRows(action)) {
        return action.rows;
    }
    return rows;
}

function columns(columns: number = initialState.menu.table.columns, action: Action) {
    if (isUpdateTableColumns(action)) {
        return action.columns;
    }
    return columns;
}

export default combineReducers({rows, columns});
