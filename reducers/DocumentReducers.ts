import * as BaseActions from "actions/BaseEditActions";
import * as Redux from "redux";
import {addElementRelativeToCurrentlyActiveElement, addElementToEndOfDocument, Document, initialState} from "stores/Document";

let setIsEditing: Redux.Reducer<Document> =
    (state: Document = initialState, action: BaseActions.SetIsEditing) => {
    if (action.type === "setIsEditing") {
        let newState: Document = { ... state };
        newState[action.itemId] = newState[action.itemId] || {itemId: action.itemId};
        for (let itemId in newState) {
            if (newState[itemId].editing) {
                newState[itemId].editing = false;
            }
        }
        newState[action.itemId].editing = action.editing;
        return newState;
    }
    return state;
};

let onEdited: Redux.Reducer<Document> =
    (state: Document = initialState, action: BaseActions.OnEdited) => {
    if (action.type === "onEdited") {
        let newState: Document = { ... state};
        newState[action.itemId] = newState[action.itemId] || {itemId: action.itemId};
        newState[action.itemId].value = action.value;
        return newState;
    }
    return state;
};

let onAddDocument: Redux.Reducer<Document> =
    (state: Document = initialState, action: BaseActions.AddToDocument) => {
    if (action.type === "addToDocument") {
    let newState: Document = {... state};
    if (action.ordering === "end") {
        addElementToEndOfDocument(newState, action.componentTypeName, action.defaultProps);
    } else {
        addElementRelativeToCurrentlyActiveElement(newState, action.componentTypeName, action.defaultProps, action.ordering);
    }
    return newState;
    }
    return state;
};

let editReducers = (document: Document, action: Redux.Action) => {
    let newDoc = setIsEditing(document, action);
    newDoc = onEdited(newDoc, action);
    newDoc = onAddDocument(newDoc, action);
    return newDoc;
};

export default editReducers;
