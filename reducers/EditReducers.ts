import * as EditableText from '../components/EditableText';
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import * as DocumentStore from "../DocumentStore";
import * as EditActions from "../actions/EditActions";

var setEditMode : Redux.Reducer<DocumentStore.DocumentView<EditableText.Props>> =
 (state : DocumentStore.DocumentView<EditableText.Props> = DocumentStore.initialState, action : EditActions.SetEditModeAction) => {
    if(action.type == "setEditMode") {
        var newState : DocumentStore.DocumentView<EditableText.Props> = { ... state };
        newState[action.itemId] = newState[action.itemId] || {itemId : action.itemId};
        newState[action.itemId].editMode = action.editMode;
        return newState;
    }
    return state;
 }

 var onEdited : Redux.Reducer<DocumentStore.DocumentView<EditableText.Props>> =
 (state : DocumentStore.DocumentView<EditableText.Props> = DocumentStore.initialState, action : EditActions.OnEditedAction) => {
     if(action.type == "edited") {
         var newState : DocumentStore.DocumentView<EditableText.Props> = { ... state};
         newState[action.itemId] = newState[action.itemId] || {itemId : action.itemId};
         newState[action.itemId].text = action.text;
         return newState;
     }
     return state;
 }

 var editReducers = (document : DocumentStore.Document, action : Redux.Action) => {
     var newDoc = setEditMode(document, action);
     newDoc = onEdited(newDoc, action);
     return newDoc;
 };

 export default editReducers;