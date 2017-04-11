import * as React from "react";
import * as ReactDOM from "react-dom";

function AutoUnfocusEditor<TProps extends object>(Component: React.ComponentClass<TProps> | React.StatelessComponent<TProps>) {
    return class extends React.Component<TProps & {onComplete: () => void} , React.ComponentState> {
        public componentDidMount() {
            window.addEventListener("click", this.onWindowClick);
        }

        public componentWillUnmount() {
            window.removeEventListener("click", this.onWindowClick);
        }

        public render() {
            return <Component {... this.props} />;
        }

        private onWindowClick = (e: MouseEvent) => {
            let editorElement = ReactDOM.findDOMNode(this);
            let menuRoot = document.getElementById("menu") as HTMLElement;

            let element = e.target as Node;
            if (!menuRoot.contains(element) && !editorElement.contains(element)) {
                // Typescript gets confused with its type inference and doesn't see that we already checked for undefined
                if (this.props.onComplete) {
                 (this.props.onComplete as () => void)();
                }
            }
        }
    };
}

export default AutoUnfocusEditor;
