import * as React from "react";

type EditorProps = React.HTMLAttributes<HTMLInputElement> & {
    value: string;
    onValueChange: (value: string) => void;
};

const minInputSize = 20;
const extraInputSpace = 2; // Extra whitespace at the end to account for any buttons in the text box.

class SingleLineEditor extends React.Component<EditorProps, {}> {
    public render() {
        const textLength = this.props.value.length;
        // tslint:disable-next-line:no-unused-variable
        let {onChange, onValueChange, ...rest} = this.props;
        return <input
            type="text"
            size={Math.max(minInputSize, textLength) + extraInputSpace}
            onChange={this.onChange}
            {...rest}
        />;
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.props.onValueChange(event.target.value);
            if (this.props.onChange !== undefined) {
                this.props.onChange(event);
            }
    }
}

export default SingleLineEditor;
