import EditableContent from "components/EditableContent";
import RichTextEditor from "components/RichTextEditor";
import RichTextPresenter from "components/RichTextPresenter";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "DocumentMappers";
import * as DraftJs from "draft-js";
import {EditableProps, getCommonInteractiveEditableProps, InteractiveEditableProps} from "EditableBase";
import * as React from "react";
import {connect} from "react-redux";

class EditableRichTextContainer extends EditableContent<DraftJs.EditorState> {}

const EditableRichText = (props: InteractiveEditableProps<DraftJs.EditorState>) => {
    const {toggleIsEditing, updateValue} = getCommonInteractiveEditableProps(props);

    return <EditableRichTextContainer
        editing={props.editing}
        toggleIsEditing={toggleIsEditing}
        updateValue={updateValue}
        staticComponentClass={RichTextPresenter}
        inputComponentClass={RichTextEditor}
        value={props.value}
    />;
};

function mapRichTextStateToProps(itemState: EditableProps<any>, updatedBaseProps: Partial<EditableProps<any>>) {
    return {
        ... updatedBaseProps,
        value : updatedBaseProps.value ? updatedBaseProps.value : DraftJs.EditorState.createEmpty(),
    };
}

export default connect(createEditableStateToPropsMapper(mapRichTextStateToProps), mapBaseActionsToProps)(EditableRichText);
