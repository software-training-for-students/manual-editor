import * as React from "react";
import * as ReactDOM from "react-dom";

function AutoUnfocusEditor<TProps extends {onComplete : () => void }>(Component : React.ComponentClass<TProps>) {
    return class extends Component {
        public componentDidMount() {
            window.addEventListener("click", this.onWindowClick);
        }

        public componentWillUnmount() {
            window.removeEventListener("click", this.onWindowClick);
        }

        private onWindowClick = (e : MouseEvent) => {
            let editorElement = ReactDOM.findDOMNode(this);
            let menuRoot = <HTMLElement>document.getElementById("menu");

            var element = <Node>e.target;
            if(!menuRoot.contains(element) && !editorElement.contains(element)) {
                this.props.onComplete();
            }
        }
    }
}

export default AutoUnfocusEditor;