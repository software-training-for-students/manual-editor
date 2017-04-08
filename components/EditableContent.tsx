import AutoUnfocusEditor from "components/enhancers/AutoUnfocusEditor";
import * as React from "react";

type ComponentType<TProps> = React.StatelessComponent<TProps> | React.ComponentClass<TProps>;

interface InputProps<T> {
    autoFocus?: boolean;
    onValueChange: (value: T) => void;
    value: T | undefined;
}

interface StaticProps<T> {
    value: T | undefined;
    onClick?: ((event: React.SyntheticEvent<HTMLElement>) => void);
}

interface Props<T> {
    editing: boolean | undefined;
    value: T | undefined;
    inputProps?: any;
    staticProps?: any;
    inputComponentClass: ComponentType<InputProps<T>>;
    staticComponentClass: string
                             | React.StatelessComponent<StaticProps<T> & {[k: string]: any}>
                             | React.ComponentClass<StaticProps<T> & {[k: string]: any}>;
    toggleIsEditing: () => void;
    updateValue: (value: T) => void;
}

type ComponentCache = {
    inputType: ComponentType<any>;
    outputType: ComponentType<any>;
};

let inputComponentCache: ComponentCache[] = [];

// We need to cache the results of applying the higher order components/enhancers because otherwise
// the creation of the new anonymous classes causes the controls to lose focus in the browser
// (React cannot tell that they are the same type)
function enhanceComponent<T>(component: ComponentType<InputProps<T>>): ComponentType<InputProps<T> & {onComplete: () => void}> {
    const filtered = inputComponentCache.filter((value) => value.inputType === component);
    if (filtered.length > 0) {
        return filtered[0].outputType;
    }
    let outputType = AutoUnfocusEditor(component);
    inputComponentCache.push({
        inputType: component,
        outputType,
    });
    return outputType;
}

class EditableContent<T> extends React.Component<Props<T> , void> {
    public render() {
        if (this.props.editing) {
            let InputComponent = enhanceComponent(this.props.inputComponentClass);
            return <InputComponent
                autoFocus
                onComplete = {this.toggleIsEditing}
                onValueChange = {this.onValueChanged}
                value = {this.props.value}
                {... this.props.inputProps}
            />;
        } else {
            let StaticComponent = this.props.staticComponentClass;
            return <StaticComponent
                onClick = {this.onStaticClicked}
                value = {this.props.value}
                {... this.props.staticProps}
            />;
        }
    }

    private toggleIsEditing = () =>
        this.props.toggleIsEditing();

    private onStaticClicked = (e: React.SyntheticEvent<HTMLElement>) => {
        e.stopPropagation();
        this.toggleIsEditing();
    }

    private onValueChanged = (value: T) =>
     this.props.updateValue(value);

};

export default EditableContent;
