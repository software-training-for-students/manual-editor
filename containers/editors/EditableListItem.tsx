import EditableElement from "components/EditableElement";
import ListItem from "components/ListItem";
import ListItemEditor from "components/ListItemEditor";
import connectEditable from "core/connectEditable";
import {RichText as ListItemInfo} from "core/ElementInfo";
import InteractivePropsFromElementInfo from "core/InteractivePropsFromElementInfo";
import * as React from "react";

const EditableListItem = (props: InteractivePropsFromElementInfo<ListItemInfo>) => {
    const EditableListItemContainer: new(...args: any[]) => EditableElement<ListItemInfo> = EditableElement;
    return <EditableListItemContainer
        {...props}
        inputComponentClass={ListItemEditor}
        staticComponentClass={ListItem}
    />;
};

export default connectEditable(EditableListItem);
