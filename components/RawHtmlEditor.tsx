import * as React from "react";
import AutoUnfocusEditor from "AutoUnfocusEditor";


interface Props {
    autoFocus? : boolean;
    onComplete : () => void;
    onValueChange : (value : string) => void;
    value : string;
}

class RawHtmlEditor extends React.Component<Props, void> {
    private onChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.onValueChange(event.target.value);
    }

    public render() {
        return <textarea onChange={this.onChange} value={this.props.value} {... this.props} />
    }
}

export default AutoUnfocusEditor(RawHtmlEditor);