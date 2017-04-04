import * as Draft from "draft-js";
import "draft-js/dist/Draft.css";
import "es6-shim";
import * as React from "react";
import AutoUnfocusEditor from "./enhancers/AutoUnfocusEditor";

interface Props {
    value: Draft.RawDraftContentState;
    onValueChange: (value: Draft.RawDraftContentState) => void;
    onComplete: () => void;
}

interface State {
    editorState: Draft.EditorState;
    showURLInput: boolean;
    urlValue: string;
}

class RichTextEditor extends React.Component<Props, State> {
    private urlInput: HTMLElement;
    private editor: Draft.Editor;

    constructor(props: Props, context?: any) {
        super(props, context);
        const content = Draft.convertFromRaw(props.value);
        const decorator = new Draft.CompositeDecorator([
            {
                component: Link,
                strategy: findEntityRanges("LINK"),
            },
            {
                component: Teletype,
                strategy: findEntityRanges("TELETYPE"),
            },
        ]);
        this.state = {
            editorState: Draft.EditorState.createWithContent(content, decorator),
            showURLInput: false,
            urlValue: "",
        };
    }

    public componentWillUnmount() {
        this.props.onValueChange(Draft.convertToRaw(this.state.editorState.getCurrentContent()));
    }

    public render() {
        let urlInput: JSX.Element | null = null;
        if (this.state.showURLInput) {
            urlInput = (
                <div className="url-input">
                    <input
                        onChange={this.onUrlChange}
                        ref={this.setUrl}
                        type="text"
                        value={this.state.urlValue}
                        onKeyDown={this.onLinkInputKeyDown}
                    />
                </div>
            );
        }
        return (
            <div className="editor">
                <div>
                    <ul>
                        <li onClick={this.toggleBold}>Bold</li>
                        <li onClick={this.toggleItalic}>Italic</li>
                        <li onClick={this.toggleUnderline}>Underline</li>
                        <li onClick={this.toggleTeletype}>Teletype</li>
                        <li onClick={this.promptForLink}>Add Link</li>
                        <li onClick={this.removeLink}>Remove Link</li>
                    </ul>
                </div>
                <hr />
                {urlInput}
                <div>
                    <Draft.Editor
                        ref={this.setEditor}
                        editorState={this.state.editorState}
                        onChange={this.onChangeEditorState}
                        placeholder={"Type your content here."}
                        handleKeyCommand={this.handleKeyCommand}
                    />
                </div>
            </div>
        );
    }

    private onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            urlValue: e.target.value,
        });
    }

    private setUrl = (urlInput: HTMLInputElement) => {
        this.urlInput = urlInput;
    }

    private setEditor = (editor: Draft.Editor) => {
        this.editor = editor;
    }

    private onChangeEditorState = (value: Draft.EditorState) => {
        this.setState({
            editorState: value,
        }, () => setTimeout(() => this.editor && this.editor.focus(), 0));
    }

    private toggleBold = () => {
        this.onChangeEditorState(Draft.RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
    }

    private toggleItalic = () => {
        this.onChangeEditorState(Draft.RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC"));
    }

    private toggleUnderline = () => {
        this.onChangeEditorState(Draft.RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE"));
    }

    private toggleTeletype = () => {
        const entityKey = Draft.Entity.create("TELETYPE", "MUTABLE");
        this.onChangeEditorState(Draft.RichUtils.toggleLink(this.state.editorState, this.state.editorState.getSelection(), entityKey));
    }

    private handleKeyCommand: (command: string) => "handled" | "not-handled" = (command: string) => {
        let state = Draft.RichUtils.handleKeyCommand(this.state.editorState, command);
        if (state) {
            this.onChangeEditorState(state);
            return "handled";
        }
        return "not-handled";
    }

    private promptForLink = () => {
        const selection = this.state.editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
               showURLInput: true,
               urlValue: "",
            }, () => setTimeout(this.urlInput.focus(), 0));
        }
    }

    private confirmLink = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        const entityKey = Draft.Entity.create("LINK", "MUTABLE", {url: this.state.urlValue});
        this.onChangeEditorState(Draft.RichUtils.toggleLink(this.state.editorState, this.state.editorState.getSelection(), entityKey));
        this.setState({
            showURLInput: false,
            urlValue: "",
        }, () => setTimeout(() => this.editor.focus(), 0));
    }

    private onLinkInputKeyDown = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if ((e.nativeEvent as KeyboardEvent).which === 13) {
            this.confirmLink(e);
        }
    }

    private removeLink = (e: React.SyntheticEvent<HTMLElement>) => {
        e.preventDefault();
        const selection = this.state.editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.onChangeEditorState(Draft.RichUtils.toggleLink(this.state.editorState, selection, null!));
        }
    }
}

function findEntityRanges(entityKey: string) {
    return (block: Draft.ContentBlock, callback: (start: number, end: number) => void) => {
        block.findEntityRanges((character: Draft.CharacterMetadata) => {
            const key = character.getEntity();
            return key !== null && Draft.Entity.get(key).getType() === entityKey;
        }, callback);
    };
}

const Link = (props: any) => {
    const {url} = Draft.Entity.get(props.entityKey).getData();
    return (
        <a href={url} target="_blank">
            {props.children}
        </a>
    );
};

const Teletype = (props: any) => {
    return <span className="type-text">{props.children}</span>;
};

export default AutoUnfocusEditor(RichTextEditor);
