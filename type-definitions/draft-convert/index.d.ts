import * as React from "react";
import {ContentState, DraftInlineStyle} from "draft-js";

type ReactElement = React.ReactElement<any>;
type DraftEntityMutability = "MUTABLE" | "IMMUTABLE" | "SEGMENTED";

type DraftBlockType = (
  'unstyled' |
  'paragraph' |
  'header-one' |
  'header-two' |
  'header-three' |
  'header-four' |
  'header-five' |
  'header-six' |
  'unordered-list-item' |
  'ordered-list-item' |
  'blockquote' |
  'code-block' |
  'atomic'
);

declare type ContentStateConverter = (contentState: ContentState) => string

declare type Tag =
  ReactElement |
  {start: string, end: string, empty?: string} |
  {element: ReactElement, empty?: ReactElement}

declare type RawEntity = {
    type: string,
    mutability: DraftEntityMutability,
    data: Object
}

declare type RawBlock = {
    type: string,
    depth: number,
    data?: object,
    text: string
}

declare var convertToHTML : convertToHTMLType;

type convertToHTMLType = {
    (contentState : ContentState) : string;
    (plugin : {
        styleToHTML?: (style: string) => Tag,
        blockToHTML?: (block: RawBlock) => Tag,
        entityToHTML?: (entity: RawEntity, originalText: string) => Tag | string
    }): (contentState : ContentState) => string;
};


type HTMLConverter = (html: string, options: {flat?: boolean}, DOMBuilder?: (... args : any[]) => any) => ContentState

type EntityKey = string

type convertFromHTMLType = {
    (html: string, options: {flat?: boolean}, DOMBuilder?: (... args : any[]) => any) : ContentState;
    (plugin : {
        htmlToStyle?: (nodeName: string, node: Node) => DraftInlineStyle,
        htmlToBlock?: (nodeName: string, node: Node) => DraftBlockType | {type: DraftBlockType, data: object} | undefined,
        htmlToEntity?: (nodeName: string, node: string)=> EntityKey | undefined,
        textToEntity?: (text : string) => Array<{entity: EntityKey, offset: number, length: number, result?: string}>
    }): (html: string, options: {flat?: boolean}, DOMBuilder?: (... args : any[]) => any) => ContentState;
}

declare var convertFromHTML : convertFromHTMLType;