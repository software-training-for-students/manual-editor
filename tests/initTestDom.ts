import {DOMWindow, JSDOM} from "jsdom";

// tslint:disable-next-line:no-namespace
declare global {
    namespace NodeJS {
        interface Global {
            document: DOMWindow["document"];
            window: DOMWindow;
            navigator: {
                userAgent: string;
            };
            [key: string]: any;
        }
    }
}

const jsdom = new JSDOM("");

global.document = jsdom.window.document;
global.window = jsdom.window;
Object.keys(global.window).forEach((property: keyof DOMWindow) => {
  if (typeof global[property] === "undefined") {
    global[property] = global.window[property];
  }
});

global.navigator = {
  userAgent: "node.js",
};
