import {Action} from "redux";

export interface UpdateHeadingText extends Action {
    type: "update-heading-text";
    text: string;
}

export function isUpdateHeadingText(action: Action): action is UpdateHeadingText {
    return action.type === "update-heading-text";
}

export interface UpdateHeadingLevel extends Action {
    type: "update-heading-level";
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function isUpdateHeadingLevel(action: Action): action is UpdateHeadingLevel {
    return action.type === "update-heading-level";
}

export interface UpdateCodeLanguage extends Action {
    type: "update-code-language";
    language: string;
}

export function isUpdateCodeLanguage(action: Action): action is UpdateCodeLanguage {
    return action.type === "update-code-lanaguage";
}

export interface UpdateTableRows extends Action {
    type: "update-table-rows";
    rows: number;
}

export function isUpdateTableRows(action: Action): action is UpdateTableRows {
    return action.type === "update-heading-rows";
}

export interface UpdateTableColumns extends Action {
    type: "update-table-columns";
    columns: number;
}

export function isUpdateTableColumns(action: Action): action is UpdateTableColumns {
    return action.type === "update-heading-columns";
}
