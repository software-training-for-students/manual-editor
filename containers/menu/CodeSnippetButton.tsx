import {AddToDocument} from "actions/BaseEditActions";
import { UpdateCodeLanguage } from "actions/MenuActions";
import MenuItem from "containers/MenuItem";
import * as React from "react";
import {connect} from "react-redux";
import { Store } from "stores";

interface Props {
    language: string;
    onCreate: (ordering: "before" | "after" | "end", defaultProps: {language: string}) => void;
    onChangeLanguage: (language: string) => void;
}

class CodeSnippetButton extends React.Component<Props, void> {
    public render() {
        return <MenuItem
            insertEnabled={!!this.props.language}
            menuItemHeading="Code Snippet"
            menuItemId="code-snippet"
            menuItemText="Insert Code Snippet"
            onCreate={this.onCreate}
        >
            <select value={this.props.language} onChange={this.onChangeLanguage}>
                <option value="html-css-javascript">HTML/CSS/JavaScript</option>
                <option value="python">Python</option>
                <option value="excel">Excel</option>
                <option value="java">Java</option>
                <option value="mathematica">Mathematica</option>
                <option value="matlab">Matlab</option>
                <option value="php-sql">PHP/SQL</option>
                <option value="r">R</option>
                <option value="tex">LaTeX</option>
            </select>
        </MenuItem>;
    }

    private onCreate = (ordering: "before" | "after" | "end") => {
        this.props.onCreate(ordering, {language: this.props.language});
    }

    private onChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onChangeLanguage(event.target.value);
    }
}

function mapStateToProps(state: Store): Partial<Props> {
    return {
        language: state.menu.code.language,
    };
}

const mapActionsToProps = ({
    onChangeLanguage: (language: string) => ({
        language,
        type: "update-code-language",
    } as UpdateCodeLanguage),
    onCreate: (ordering: "before" | "after" | "end", defaultProps: {language: string}) => ({
        componentTypeName: "Code",
        defaultProps,
        ordering,
        type: "addToDocument",
    } as AddToDocument),
});

export default connect(mapStateToProps, mapActionsToProps)(CodeSnippetButton);
