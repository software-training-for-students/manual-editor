import EditableContent from "components/EditableContent";
import * as RichText from "components/RichText";
import {createEditableStateToPropsMapper, mapBaseActionsToProps} from "core/DocumentMappers";
import {EditableProps, getCommonInteractiveEditableProps, InteractiveEditableProps} from "core/EditableBase";
import * as DraftJs from "draft-js";
import * as React from "react";
import {connect} from "react-redux";

class EditableRichTextContainer extends EditableContent<DraftJs.RawDraftContentState> {}

const EditableRichText = (props: InteractiveEditableProps<DraftJs.RawDraftContentState>) => {

    return <EditableRichTextContainer
        {... props}
        {... getCommonInteractiveEditableProps(props)}
        staticComponentClass={RichText.Presenter}
        inputComponentClass={RichText.Editor}
    />;
};

function mapRichTextStateToProps(itemState: EditableProps<any>, updatedBaseProps: Partial<EditableProps<any>>) {
    return {
        ... updatedBaseProps,
        value : updatedBaseProps.value ? updatedBaseProps.value : {blocks: [], entityMap: {}},
    };
}

export default connect(createEditableStateToPropsMapper(mapRichTextStateToProps), mapBaseActionsToProps)(EditableRichText);
