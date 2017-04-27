import removable from "components/higher-order/removable";
import EditableCode from "containers/editors/EditableCode";
import EditableHeading from "containers/editors/EditableHeading";
import EditableHtml from "containers/editors/EditableHtml";
import EditableImage from "containers/editors/EditableImage";
import EditableKeyboardShortcut from "containers/editors/EditableKeyboardShortcut";
import EditableListItem from "containers/editors/EditableListItem";
import EditableRichText from "containers/editors/EditableRichText";
import EditableSidebarNote from "containers/editors/EditableSidebarNote";
import EditableToolbox from "containers/editors/EditableToolbox";
import * as React from "react";
import { ItemTree } from "./../stores/Document";

type EditableElementProps = {
    itemId: number;
    items?: ItemTree[];
};

function MetaElement(Container: React.ComponentClass<void> | React.SFC<void>) {
    return (props: EditableElementProps) => (
        <Container>
            {props.items && props.items.map(createElement)}
        </Container>
    );
}

interface ElementTypes {
    [name: string]: React.ComponentClass<EditableElementProps> | React.StatelessComponent<EditableElementProps>;
}

let elementTypes: ElementTypes = {
    ["Heading"] : removable(EditableHeading),
    ["SingleImage"] : removable(EditableImage.EditableSingleImage),
    ["SideBySideImage"] : removable(EditableImage.EditableSideBySideImage),
    ["RichText"] : removable(EditableRichText),
    ["RawHtml"] : removable(EditableHtml),
    ["Code"] : removable(EditableCode),
    ["SidebarNote"] : removable(EditableSidebarNote),
    ["Toolbox"]: removable(EditableToolbox),
    ["UnorderedList"] : MetaElement(({children}) => <ul>{children}</ul>),
    ["OrderedList"] : MetaElement(({children}) => <ol>{children}</ol>),
    ["InstructionList"] : MetaElement(({children}) => <ol className="instruction-list">{children}</ol>),
    ["ListItem"] : removable(EditableListItem),
    ["Table"] : removable(MetaElement(({children}) => <table><tbody>{children}</tbody></table>)),
    ["TableRow"] : MetaElement(({children}) => <tr>{children}</tr>),
    ["TableCell"] : MetaElement(({children}) => <td>{children}</td>),
    ["TableHeader"] : MetaElement(({children}) => <th>{children}</th>),
    ["KeyboardShortcut"]: removable(EditableKeyboardShortcut),
};

export default function createElement(props: ItemTree) {
    const Element = elementTypes[props.elementType];
    return <Element itemId={props.itemId} key={props.itemId} items={props.items} />;
}
