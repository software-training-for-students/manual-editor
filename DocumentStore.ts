import { EditableProps, EditableActionsMap, InteractiveEditableProps } from './EditableBase';
import * as BaseActions from './actions/BaseActions';

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
    4 : {
        itemId : 4,
        editing : false,
        value : "Test Header",
        level : 1
    },
    nextItemId : 4,
    elementOrdering : [
        {itemId: 3, elementType: "SingleImage"},
        {itemId: 4, elementType: "Heading"}
        ]
}

function addElementToEndOfDocument(document : Document, elementType : string, elementState: EditableProps<any>) {
    var itemId = document.nextItemId;
    document[itemId] = {... elementState, editing : true};
    document.elementOrdering.push({itemId, elementType});
}
