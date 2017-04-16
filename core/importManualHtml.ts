import { ContentState, convertFromHTML, convertToRaw } from "draft-js";
import {decode} from "he";
import {addElements, Document, ElementInfo} from "stores/Document";

function extractElements(parentElement: Element): ElementInfo[] {
    let encounteredIntro = !(parentElement instanceof HTMLBodyElement);
    let items: ElementInfo[] = [];
    for (let i = 0; i < parentElement.children.length; ++i) {
        let currentElement = parentElement.children.item(i);
        if (!encounteredIntro) {
            if (currentElement.innerHTML === "Introduction") {
                encounteredIntro = true;
            }
            continue;
        }
        items = items.concat(convertCurrentElement(currentElement));
    }
    return items;
}

function convertCurrentElement(currentElement: Element) {
            switch (currentElement.tagName.toLowerCase()) {
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
                return [
                    {
                        elementState: {
                            level: parseInt(currentElement.tagName[1], 10),
                            value: currentElement.innerHTML,
                        },
                        elementType: "Heading",
                    },
                ];
            case "ul":
            {
                let listElements: ElementInfo[] = [
                    {
                        elementType: "UnorderedList",
                        metaItemType: "open",
                    },
                    {
                        elementType: "UnorderedList",
                        metaItemType: "close",
                    },
                ];
                Array.prototype.splice.apply(listElements, (<any[]> [1, 0]).concat(extractElements(currentElement)));
                return listElements;
            }
            case "li":
            {
                let content = ContentState.createFromBlockArray(convertFromHTML(currentElement.innerHTML));
                return [
                    {
                        elementState: {
                            value: convertToRaw(content),
                        },
                        elementType: "ListItem",
                    },
                ];
            }
            case "ol":
            {
                let elementType = currentElement.classList.contains("instruction-list") ? "InstructionList" : "OrderedList";
                let listElements: ElementInfo[] = [
                    {
                        elementType,
                        metaItemType: "open",
                    },
                    {
                        elementType,
                        metaItemType: "close",
                    },
                ];
                Array.prototype.splice.apply(listElements, (<any[]> [1, 0]).concat(extractElements(currentElement)));
                return listElements;
            }
            case "p":
            {
                let content = ContentState.createFromBlockArray(convertFromHTML(currentElement.outerHTML));
                return [
                    {
                        elementState: {
                            value: convertToRaw(content),
                        },
                        elementType: "RichText",
                    },
                ];
            }
            case "pre":
            {
                let codeLanguage: string = "";
                let head = currentElement.ownerDocument.head;
                for (let j = 0; j < head.children.length; ++j) {
                    let headElement = head.children.item(j);
                    if (headElement.tagName.toLowerCase() === "script") {
                        let scriptTag = <HTMLScriptElement> headElement;
                        let found = scriptTag.src.match(/([A-Za-z-]+)-highlight.js/);
                        if (found) {
                            codeLanguage = found[1];
                            break;
                        }
                    }
                }
                return [
                    {
                        elementState: {
                            language: codeLanguage,
                            value: decode(currentElement.children[0].innerHTML),
                        },
                        elementType: "Code",
                    },
                ];
            }
            case "div":
            return [
                generateDivItem(<HTMLDivElement> currentElement),
            ];
            default: // TODO: make default case output RawHTML control.
                console.warn(`Unsupported Tag ${currentElement.tagName}. Imported into a Raw HTML element.`);
                return [
                    {
                        elementState: {
                            value: currentElement.outerHTML,
                        },
                        elementType: "RawHtml",
                    },
                ];
        }
}

function generateDivItem(element: HTMLDivElement): ElementInfo {
    const classList = element.classList;
    const classes = element.className;
    if (classes.includes("image") || classList.contains("sidebar-icon")) {
        const border = element.getAttribute("border") !== null || classList.contains("border");
        const captionElement = element.querySelector("p");
        const caption = captionElement ? captionElement.innerText : "";
        let className: string;
        for (let i = 0; i < classList.length; ++i) {
            if (classList.item(i).includes("image")) {
                className = classList.item(i);
                if (className.includes("sidebyside")) {
                    let leftSrc = element.querySelectorAll("img")[0].src;
                    let rightSrc = element.querySelectorAll("img")[1].src;
                    return {
                        elementState: {
                            value: {
                                border,
                                caption,
                                leftSrc,
                                rightSrc,
                                className,
                            },
                        },
                        elementType: "SideBySideImage",
                    };
                } else {
                    let src = element.querySelector("img")!.src;
                    return {
                        elementState: {
                            value: {
                                border,
                                caption,
                                src,
                                className,
                            },
                        },
                        elementType: "SideBySideImage",
                    };
                }
            }
        }
        throw new Error("Impossible error: Class-list does not contain an image class, but the className attribute does.");
    } else if (classList.contains("sidebar-note")) {
        const title = element.querySelector("h2")!.innerText;
        const content = convertToRaw(ContentState.createFromBlockArray(convertFromHTML(element.querySelector("h2")!.outerHTML)));
        const imageElement = element.querySelector("img");
        const imgSource = imageElement ? imageElement.src : "";
        return {
            elementState: {
                value: {
                    title,
                    content,
                    imgSource,
                },
            },
            elementType: "SidebarNote",
        };
    } else if (classList.contains("toolbox")) {
        let items = [];
        for (let i = 0; i < element.children.length; ++i) {
            let item = element.children.item(i);
            let imgSrc = item.querySelector("img")!.src;
            let content = item.querySelector("p")!;
            let name = content.querySelector("b")!.innerText;
            content.removeChild(content.querySelector("b")!);
            let description = content.innerText;
            items.push({
                imgSrc,
                name,
                description,
            });
        }
        return {
            elementState: {
                value: items,
            },
            elementType: "Toolbox",
        };
    } else {
        console.warn(`Unsupported div classes: ${classes}. Imported into a Raw HTML element`);
        return {
            elementState: {
                value: element.outerHTML,
            },
            elementType: "RawHtml",
        };
    }
}

export default function importManualHtml(html: string): Document {
    let parser = new DOMParser();
    let oldManual = parser.parseFromString(html, "text/html");
    let newManual: Document = {
        1: {
            itemId: 1,
            level: 1,
            value: oldManual.querySelector("#coverpage-title h1")!.textContent,
        },
        2: {
            itemId: 2,
            level: 2,
            value: oldManual.querySelector("#coverpage-title h2")!.textContent,
        },
        3: {
            itemId: 3,
            level: 1,
            value: "Introduction",
        },
        elementOrdering: [
            {itemId: 3, elementType: "Heading"},
        ],
        nextItemId: 4,
    };
    addElements(newManual, extractElements(oldManual.body));
    return newManual;
}
