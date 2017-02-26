import { EditableProps, EditableActionsMap, InteractiveEditableProps } from 'EditableBase';
import * as BaseActions from 'actions/BaseEditActions';

export interface ItemOrdering {
        itemId: number;
        elementType : string;
}

// Redux mapping and reducing functions can use this interface to get strongly typed data.
export interface DocumentView<TProps extends EditableProps<any>> {
    [itemId : number] : TProps;
    nextItemId : number;
    elementOrdering : ItemOrdering[];
}

export interface Document extends DocumentView<EditableProps<any> & any> {}

export var initialState : Document = {
    1 : {
        itemId : 1,
        value : "Empty Manual Template",
        editing : false,
        level : 1
    },
    2 : {
        itemId : 2,
        value : "Small Tagline Description Here",
        editing : false,
        level : 2
    },
    3 : {
        itemId : 3,
        editing : false,
        value : {
            source : "http://software-training-for-students.github.io/manual-master-files/sts-services.png",
            caption : "Caption",
            border : false,
            className : "centered-image-large"
        }
    },
    nextItemId : 4,
    elementOrdering : [
        {itemId: 3, elementType: "SingleImage"}
        ]
}

export function addElementToEndOfDocument(document : Document, elementType : string, elementState: EditableProps<any>) {
    for(var i = 0; i < document.nextItemId ; ++i) {
        if(document[i])
            document[i].editing = false;
    }
    var itemId = document.nextItemId;
    document[itemId] = {... elementState, editing : true};
    document.nextItemId++;
    document.elementOrdering.push({itemId, elementType});
}
