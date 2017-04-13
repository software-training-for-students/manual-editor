import EditableContent from "components/EditableContent";
import ListItem from "components/ListItem";
import ListItemEditor from "components/ListItemEditor";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "core/DocumentMappers";
import {getCommonInteractiveEditableProps, InteractiveEditableProps} from "core/EditableBase";
import {RawDraftContentState} from "draft-js";
import * as React from "react";
import * as ReactRedux from "react-redux";

class EditableListItemContainer extends EditableContent<RawDraftContentState> {};

const EditableListItem = (props: InteractiveEditableProps<RawDraftContentState>) => {
    return <EditableListItemContainer
        {...props}
        {... getCommonInteractiveEditableProps(props)}
        inputComponentClass={ListItemEditor}
        staticComponentClass={ListItem}
    />;
};

export default ReactRedux.connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableListItem);
