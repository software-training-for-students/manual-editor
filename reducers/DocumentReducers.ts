import * as BaseActions from "actions/BaseEditActions";
import * as SaveLoadActions from "actions/SaveLoadActions";
import * as UpgradeScripts from "core/UpgradeScripts";
import * as Redux from "redux";
import {addElements, Document, initialState, removeElement} from "stores/Document";

let setIsEditing =
    (state: Document = initialState, action: BaseActions.SetIsEditing) => {
    if (action.type === "setIsEditing") {
        let newState: Document = { ... state };
        newState[action.itemId] = {... newState[action.itemId]} || {itemId: action.itemId};
        if (action.editing) {
            for (let itemId in newState) {
                if (newState[itemId].editing) {
                    newState[itemId] = {... newState[itemId], editing: false};
                }
            }
        }
        newState[action.itemId].editing = action.editing;
        return newState;
    }
    return state;
};

let onEdited =
    (state: Document = initialState, action: BaseActions.OnEdited) => {
    if (action.type === "onEdited") {
        let newState: Document = { ... state};
        newState[action.itemId] = {... newState[action.itemId]} || {itemId: action.itemId};
        newState[action.itemId].value = action.value;
        return newState;
    }
    return state;
};

let onAddDocument =
    (state: Document = initialState, action: BaseActions.AddToDocument) => {
    if (action.type === "addToDocument") {
        let newState: Document = {
            ... state,
        };
        addElements(newState, action.items, false, action.itemToEdit, action.ordering);
        return newState;
    }
    return state;
};

let onRemoveElement =
    (state: Document= initialState, action: BaseActions.RemoveFromDocument) => {
    if (action.type === "removeFromDocument") {
        let newState: Document = {
            ...state,
        };
        removeElement(newState, action.itemId);
        return newState;
    }
    return state;
};

let onSetDocument = (state: Document = initialState, action: SaveLoadActions.SetDocumentAction) => {
    if (action.type === "set-document") {
        let document = action.document;
        if (action.version && action.version !== UpgradeScripts.saveVersion) {
            document = UpgradeScripts.upgradeDocument(document, action.version);
        }
        return document;
    }
    return state;
};

let editReducers = (document: Document, action: Redux.Action) => {
    let newDoc = setIsEditing(document, action as BaseActions.SetIsEditing);
    newDoc = onEdited(newDoc, action as BaseActions.OnEdited);
    newDoc = onAddDocument(newDoc, action as BaseActions.AddToDocument);
    newDoc = onRemoveElement(newDoc, action as BaseActions.RemoveFromDocument);
    newDoc = onSetDocument(newDoc, action as SaveLoadActions.SetDocumentAction);
    return newDoc;
};

export default editReducers;
