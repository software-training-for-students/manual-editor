import * as React from "react";
import * as ReactRedux from "react-redux";
import EditableContent from "components/EditableContent";
import RawHtmlEditor from "components/RawHtmlEditor";
import HtmlPresenter from "components/HtmlPresenter";
import {InteractiveEditableProps, getCommonInteractiveEditableProps} from "EditableBase";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "DocumentMappers";

class EditableRawHtml extends EditableContent<string>{};

const EditableHtml = (props: InteractiveEditableProps<string>) => {
    
    const {toggleIsEditing, updateValue} = getCommonInteractiveEditableProps(props);

    return <EditableRawHtml
        inputComponentClass={RawHtmlEditor}
        staticComponentClass={HtmlPresenter}
        {...props}
        toggleIsEditing={toggleIsEditing}
        updateValue={updateValue} />
}


export default ReactRedux.connect(createEditableStateToPropsMapper(), mapBaseActionsToProps)(EditableHtml);