import * as React from "react";
import {connect} from "react-redux";
import MenuItem from "../MenuItem";
import {AddToDocument} from "../../actions/BaseEditActions";
import {Store} from "../../stores";

interface Props {
    onCreateHeader : (componentTypeName : string,
        defaultProps : any,
        ordering: "before" | "after" | "end",
        relativeToItem? : number) => void;
    headingLevel : 1 | 2 | 3 | 4 | 5 | 6;
    headingText : string;
}

class HeaderButton extends React.Component<Props, void> {
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

    }

    private levelChanged = () => {

    }

    private textChanged = () => {

    }
}

function mapStateToProps(state : Store) {
    return {};
}

var mapActionsToProps = ({
    onCreateHeader : (componentTypeName : string,
        defaultProps : any,
        ordering: "before" | "after" | "end",
        relativeToItem? : number) => ({
            type : "addToDocument",
            ordering,
            relativeToItem,
            defaultProps
        } as AddToDocument)
});

export default connect(mapStateToProps, mapActionsToProps)(HeaderButton);