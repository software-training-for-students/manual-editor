import ImagePicker from "containers/ImagePicker";
import {Toolbox as ToolboxProps} from "core/ElementInfo";
import * as React from "react";

type Props = ToolboxProps & {
    onValueChange: (value: ToolboxProps["value"]) => void;
}

// I can't think of a way to do the callbacks without lambdas or bind (which both have the same perf problem)
// tslint:disable:jsx-no-lambda

export class ToolboxEditor extends React.Component<Props, void> {
    public render() {
        return (
            <div className="toolbox">
                {
                    this.props.value.map((entry, idx) => (
                        <div key={idx}>
                            <ImagePicker currentImage={entry.imgSrc} onImageChanged={(source) => this.onChangeImage(source, idx)} />
                            <input type="text" placeholder="Tool Name" value={entry.name} onChange={(e) => this.onChangeName(e, idx)} onKeyPress={(e) => this.onKeyPress(e, idx)} />
                            <input type="text" placeholder="Tool Description" value={entry.description} onChange={(e) => this.onChangeDescription(e, idx)} onKeyPress={(e) => this.onKeyPress(e, idx)} />
                        </div>
                    ))
                }
            </div>
        );
    }

    private onChangeImage = (imageUrl: string, index: number) => {
        let value = this.props.value.slice();
        value[index] = {... value[index], imgSrc: imageUrl};
        this.props.onValueChange(value);
    }

    private onChangeName = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let value = this.props.value.slice();
        value[index] = {... value[index], name: e.target.value};
        this.props.onValueChange(value);
    }

    private onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let value = this.props.value.slice();
        value[index] = {... value[index], description: e.target.value};
        this.props.onValueChange(value);
    }

    private onKeyPress = (e: React.SyntheticEvent<HTMLInputElement>, index: number) => {
        let keyEvent = e.nativeEvent as KeyboardEvent;
        if (keyEvent.keyCode === 13) { // enter
            let value = this.props.value.slice();
            value.splice(index + 1, 0, {
                description: "",
                imgSrc: "",
                name: "",
            });
            this.props.onValueChange(value);
        }
    }
}

export default ToolboxEditor;
