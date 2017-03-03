import {AddToDocument} from "actions/BaseEditActions";
import {UpdateHeadingLevel, UpdateHeadingText} from "actions/MenuActions";
import MenuItem from "containers/MenuItem";
import * as React from "react";
import {connect} from "react-redux";
import {initialState, Store} from "stores";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
    onCreate?: (componentTypeName: string,
        defaultProps: any,
        ordering: "before" | "after" | "end") => void;
    levelChanged?: (newLevel: HeadingLevel) => void;
    textChanged?: (text: string) => void;

    headingLevel: HeadingLevel;
    headingText: string;
}

class HeadingButton extends React.Component<Props, void> {
    public render() {
        return (
        <MenuItem
            menuItemId="headings"
            menuItemText="Headings"
            menuItemHeading="Create Heading"
            onCreate={this.onCreate}
            insertEnabled={this.props.headingText.length !== 0}
        >
            <section>
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

    private onCreate = (ordering: "before" | "after" | "end") => {
        if (this.props.onCreate) {
            this.props.onCreate("Heading", {
                level: this.props.headingLevel,
                value: this.props.headingText,
            },
            ordering);
        }
    }

    private levelChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (this.props.levelChanged) {
            this.props.levelChanged(parseInt(e.target.value, 10) as HeadingLevel);
        }
    }

    private textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.textChanged) {
            this.props.textChanged(e.target.value);
        }
    }
}

function mapStateToProps(state: Store = initialState): Props {
    return {
        headingLevel: state.menu.heading.level,
        headingText: state.menu.heading.text,
    };
}

let mapActionsToProps = ({
    levelChanged: (newLevel: HeadingLevel) => ({
        level: newLevel,
        type: "update-heading-level",
    } as UpdateHeadingLevel),
    onCreate: (componentTypeName: string,
        defaultProps: any,
        ordering: "before" | "after" | "end") => ({
            type: "addToDocument",
            componentTypeName,
            ordering,
            defaultProps,
        } as AddToDocument),
    textChanged: (newText: string) => ({
        text: newText,
        type: "update-heading-text",
    } as UpdateHeadingText),
});

export default connect(mapStateToProps, mapActionsToProps)(HeadingButton);
