import * as EditableText from '../components/EditableText';
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import * as DocumentStore from "../DocumentStore";
import * as BaseActions from "../actions/BaseActions";

var setIsEditing : Redux.Reducer<DocumentStore.Document> =
 (state : DocumentStore.Document = DocumentStore.initialState, action : BaseActions.SetIsEditing) => {
    if(action.type == "setIsEditing") {
        var newState : DocumentStore.Document = { ... state };
        newState[action.itemId] = newState[action.itemId] || {itemId : action.itemId};
        newState[action.itemId].editing = action.editing;
        return newState;
    }
    return state;
 }

 var onEdited : Redux.Reducer<DocumentStore.Document> =
 (state : DocumentStore.Document = DocumentStore.initialState, action : BaseActions.OnEdited) => {
     if(action.type == "edited") {
         var newState : DocumentStore.Document = { ... state};
         newState[action.itemId] = newState[action.itemId] || {itemId : action.itemId};
         newState[action.itemId].value = action.value;
         return newState;
     }
     return state;
 }

 var editReducers = (document : DocumentStore.Document, action : Redux.Action) => {
     var newDoc = setIsEditing(document, action);
     newDoc = onEdited(newDoc, action);
     return newDoc;
 };

 export default editReducers;