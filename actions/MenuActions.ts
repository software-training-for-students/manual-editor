import {Action} from "redux";

export interface UpdateHeadingText extends Action {
    type: "update-heading-text";
    text: string;
}

export interface UpdateHeadingLevel extends Action {
    type: "update-heading-level";
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface UpdateCodeLanguage extends Action {
    type: "update-code-language";
    language: string;
}
