import EditableContent from "components/EditableContent";
import ListItem from "components/ListItem";
import ListItemEditor from "components/ListItemEditor";
import connectEditable from "core/connectEditable";
import {getCommonInteractiveEditableProps, InteractivePropsFromElementInfo} from "core/EditableBase";
import {ListItem as ListItemInfo} from "core/ElementInfo";
import * as React from "react";

class EditableListItemContainer extends EditableContent<ListItemInfo["value"]> {};

const EditableListItem = (props: InteractivePropsFromElementInfo<ListItemInfo>) => {
    return <EditableListItemContainer
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={ListItemEditor}
        staticComponentClass={ListItem}
    />;
};

export default connectEditable()(EditableListItem);
