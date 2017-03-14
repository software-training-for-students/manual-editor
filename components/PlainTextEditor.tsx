import AutoUnfocusEditor from "AutoUnfocusEditor";
import * as React from "react";

interface Props {
    autoFocus?: boolean;
    onValueChange: (value: string) => void;
    value: string;
}

class PlainTextEditor extends React.Component<Props, void> {
public render() {
        return <textarea onChange={this.onChange} value={this.props.value} {... this.props} onKeyDownCapture={this.onKeyDown} />;
    }

    private onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.onValueChange(event.target.value);
    }

    private onKeyDown = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
        let nativeEvent = event.nativeEvent as KeyboardEvent;
        if (nativeEvent.keyCode === 9) { // Tab Key
            event.preventDefault();
            let selectionStart = event.currentTarget.selectionStart;
            let selectionEnd = event.currentTarget.selectionEnd;
            this.props.onValueChange(this.props.value.substring(0, selectionStart) + "\t" + this.props.value.substring(selectionEnd));
            event.currentTarget.selectionStart = event.currentTarget.selectionEnd = selectionStart + 1;
        }
    }
}

export default AutoUnfocusEditor(PlainTextEditor);
