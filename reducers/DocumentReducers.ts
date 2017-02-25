import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import {Document, initialState, addElementToEndOfDocument} from "stores/Document";
import * as BaseActions from "actions/BaseEditActions";

var setIsEditing : Redux.Reducer<Document> =
 (state : Document = initialState, action : BaseActions.SetIsEditing) => {
    if(action.type == "setIsEditing") {
        var newState : Document = { ... state };
        newState[action.itemId] = newState[action.itemId] || {itemId : action.itemId};
        for(let itemId in newState) {
            if(newState[itemId].editing) {
                newState[itemId].editing = false;
            }
        }
        newState[action.itemId].editing = action.editing;
        return newState;
    }
    return state;
 }

 var onEdited : Redux.Reducer<Document> =
 (state : Document = initialState, action : BaseActions.OnEdited) => {
     if(action.type == "onEdited") {
         var newState : Document = { ... state};
         newState[action.itemId] = newState[action.itemId] || {itemId : action.itemId};
         newState[action.itemId].value = action.value;
         return newState;
     }
     return state;
 }

 var onAddDocument : Redux.Reducer<Document> =
 (state : Document = initialState, action: BaseActions.AddToDocument) => {
     if(action.type == "addToDocument") {
        var newState : Document = {... state};
        if(action.ordering == "end") {
            addElementToEndOfDocument(newState, action.componentTypeName, action.defaultProps);
        }
        return newState;
     }
     return state;
 }

 var editReducers = (document : Document, action : Redux.Action) => {
     var newDoc = setIsEditing(document, action);
     newDoc = onEdited(newDoc, action);
     newDoc = onAddDocument(newDoc, action);
     return newDoc;
 };

 export default editReducers;