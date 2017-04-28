import autoUnfocus from "components/higher-order/autoUnfocus";
import * as React from "react";

type ComponentType<TProps> = React.StatelessComponent<TProps> | React.ComponentClass<TProps>;

interface InputProps<T> {
    autoFocus?: boolean;
    onValueChange: (value: T) => void;
    value: T;
}

interface StaticProps<T> {
    value: T;
}

interface Props<T> {
    editing: boolean;
    value: T;
    inputProps?: any;
    staticProps?: any;
    inputComponentClass: ComponentType<InputProps<T>>;
    staticComponentClass: ComponentType<StaticProps<T>>;
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
    let outputType = autoUnfocus(component);
    inputComponentCache.push({
        inputType: component,
        outputType,
    });
    return outputType;
}

class EditableContent<T> extends React.Component<Props<T> , {}> {
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
            return (
                <div onClick={this.onStaticClicked}>
                    <StaticComponent
                        value = {this.props.value}
                        {... this.props.staticProps}
                    />
                </div>
            );
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
