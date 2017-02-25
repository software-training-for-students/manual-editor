import * as React from "react";
import {connect} from "react-redux";
import MenuItem from "containers/MenuItem";
import {AddToDocument} from "actions/BaseEditActions";
import {UpdateHeadingLevel, UpdateHeadingText} from "actions/MenuActions";
import {Store, initialState} from "stores";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
    onCreateHeader? : (componentTypeName : string,
        defaultProps : any,
        ordering: "before" | "after" | "end",
        relativeToItem? : number) => void;
    levelChanged? : (newLevel : HeadingLevel) => void;
    textChanged? : (text : string) => void;

    headingLevel : HeadingLevel;
    headingText : string;
}

class HeadingButton extends React.Component<Props, void> {
    public render() {
        return (
        <MenuItem menuItemId="headings" menuItemText="Headings"
            confirmationText="Create Heading"
            onCreate={this.onCreate}>
            <section>
                <label htmlFor="newHeadingLevel">Heading Level</label>
                <select onChange={this.levelChanged} value={this.props.headingLevel}>
                    <option value={1}>Section Heading</option>
                    <option value={2}>Subsection Heading</option>
                    <option value={3}>Sub-Subsection Heading</option>
                    <option value={4}>Paragraph Heading</option>
                    <option value={5}>Sub-paragraph Heading</option>
                </select>
            </section>
            <section>
                <input placeholder="Heading Text" value={this.props.headingText} onChange={this.textChanged} />
            </section>
        </MenuItem>
        );
    }

    private onCreate = () => {
        if(this.props.onCreateHeader)
            this.props.onCreateHeader("Heading", {
                value : this.props.headingText,
                level : this.props.headingLevel,
            },
            "end");
    }

    private levelChanged = (e : React.ChangeEvent<HTMLSelectElement>) => {
        if(this.props.levelChanged)
            this.props.levelChanged(parseInt(e.target.value) as HeadingLevel);
    }

    private textChanged = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(this.props.textChanged)
            this.props.textChanged(e.target.value);
    }
}

function mapStateToProps(state : Store = initialState) : Props {
    return {
        headingLevel : state.menu.heading.level,
        headingText : state.menu.heading.text
    };
}

var mapActionsToProps = ({
    onCreateHeader : (componentTypeName : string,
        defaultProps : any,
        ordering: "before" | "after" | "end",
        relativeToItem? : number) => ({
            type : "addToDocument",
            componentTypeName,
            ordering,
            relativeToItem,
            defaultProps
        } as AddToDocument),
    levelChanged : (newLevel : HeadingLevel) => ({
        type : "update-heading-level",
        level : newLevel
    } as UpdateHeadingLevel),
    textChanged: (newText : string) => ({
        type: "update-heading-text",
        text : newText
    } as UpdateHeadingText)
});

export default connect(mapStateToProps, mapActionsToProps)(HeadingButton);