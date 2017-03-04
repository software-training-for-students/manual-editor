import { UpdateCodeLanguage } from "actions/MenuActions";
import { initialState } from "stores/Menu";

export default function updateCodeLanguage(store: {language: string} = initialState.code, action: UpdateCodeLanguage) {
    if (action.type === "update-code-language") {
        return {...store, language : action.language};
    }
    return store;
}
