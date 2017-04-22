import "es6-shim";

import {RichText as Props} from "core/ElementInfo";
import * as Draft from "draft-js";
import "draft-js/dist/Draft.css";
import * as React from "react";
import {findDOMNode} from "react-dom";

const styleMap: {[style: string]: React.CSSProperties} = {
    HIGHLIGHT : {
        backgroundColor: "#BFF0FF",
        border: {
            radius: "0.25em",
        },
    },
    TELETYPE : {
        backgroundColor: "#F7F7F7",
        border: {
            radius: "0.25em",
        },
        fontFamily: "Source Code Pro, serif",
        fontSize: "0.95em",
    },
};

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

const decorator = new Draft.CompositeDecorator([
    {
        component: Link,
        strategy: findEntityRanges("LINK"),
    },
]);

type EditorProps = Props & {
    onValueChange: (value: Props["value"]) => void;
};

interface EditorState {
    editorState: Draft.EditorState;
    showURLInput: boolean;
    urlValue: string;
}

class RichTextEditor extends React.Component<EditorProps, EditorState> {
    private urlInput: HTMLElement;
    private editor: Draft.Editor;

    constructor(props: EditorProps, context?: any) {
        super(props, context);
        const content = Draft.convertFromRaw(props.value);
        this.state = {
            editorState: Draft.EditorState.createWithContent(content, decorator),
            showURLInput: false,
            urlValue: "",
        };
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
                        <li tabIndex={4} onClick={this.toggleBold}>Bold</li>
                        <li tabIndex={5} onClick={this.toggleItalic}>Italic</li>
                        <li tabIndex={6} onClick={this.toggleUnderline}>Underline</li>
                        <li tabIndex={7} onClick={this.toggleTeletype}>Teletype</li>
                        <li tabIndex={8} onClick={this.toggleHighlight}>Highlight</li>
                        <li tabIndex={9} onClick={this.promptForLink}>Add Link</li>
                        <li tabIndex={10} onClick={this.removeLink}>Remove Link</li>
                    </ul>
                </div>
                <hr />
                {urlInput}
                <div>
                    <Draft.Editor
                        ref={this.setEditor}
                        editorState={this.state.editorState}
                        onChange={this.onChangeEditorStateAllowBlur}
                        placeholder={"Type your content here."}
                        handleKeyCommand={this.handleKeyCommand}
                        onBlur={this.onBlur}
                        customStyleMap={styleMap}
                    />
                </div>
            </div>
        );
    }

    private onBlur = (e: React.SyntheticEvent<{}>) => {
        let editorNode = findDOMNode(this);
        let newFocus = (e as React.MouseEvent<{}>).relatedTarget as Node;
        if (!editorNode.contains(newFocus)) {
            this.props.onValueChange(Draft.convertToRaw(this.state.editorState.getCurrentContent()));
        }
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

    private onChangeEditorStateAllowBlur = (value: Draft.EditorState) => {
        this.setState({
            editorState: value,
        });
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
        this.onChangeEditorState(Draft.RichUtils.toggleInlineStyle(this.state.editorState, "TELETYPE"));
    }

    private toggleHighlight = () => {
        this.onChangeEditorState(Draft.RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT"));
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

interface PresenterState {
    editorState: Draft.EditorState;
}

// tslint:disable-next-line:max-classes-per-file
class RichTextPresenter extends React.Component<Props, PresenterState> {
    constructor(props: EditorProps, context?: any) {
        super(props, context);
        const content = Draft.convertFromRaw(props.value);

        this.state = {
            editorState: Draft.EditorState.createWithContent(content, decorator),
        };
    }

    public componentWillReceiveProps(props: Props) {
        this.setState({
            editorState: Draft.EditorState.createWithContent(Draft.convertFromRaw(props.value), decorator),
        });
    }

    public render() {
        return <Draft.Editor
                readOnly
                editorState={this.state.editorState}
                placeholder={"Empty Paragraph"}
                customStyleMap={styleMap}
                onChange={this.onChange}
        />;
    }

    private onChange= () => {
        // No changes handled in read-only mode
    }
}

export {RichTextEditor as Editor, RichTextPresenter as Presenter};
