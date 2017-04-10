import EditableContent from "components/EditableContent";
import ListItem from "components/ListItem";
import ListItemEditor from "components/ListItemEditor";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "core/DocumentMappers";
import {getCommonInteractiveEditableProps, InteractiveEditableProps} from "core/EditableBase";
import * as React from "react";
import * as ReactRedux from "react-redux";

class EditableListItemContainer extends EditableContent<string> {};

const EditableListItem = (props: InteractiveEditableProps<string>) => {
    return <EditableListItemContainer
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={ListItemEditor}
        staticComponentClass={ListItem}
    />;
};

export default ReactRedux.connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableListItem);
