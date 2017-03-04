import AutoUnfocusEditor from "AutoUnfocusEditor";
import * as React from "react";

interface Props {
    autoFocus?: boolean;
    onComplete: () => void;
    onValueChange: (value: string) => void;
    value: string;
}

class PlainTextEditor extends React.Component<Props, void> {
public render() {
        return <textarea onChange={this.onChange} value={this.props.value} {... this.props} />;
    }

    private onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.onValueChange(event.target.value);
    }
}

export default AutoUnfocusEditor(PlainTextEditor);
