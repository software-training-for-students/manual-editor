export interface HeadingStore {
        level : 1 | 2 | 3 | 4 | 5 | 6;
        text : string;
}

export interface MenuStore {
    heading : HeadingStore;
}

export var initialState : MenuStore = {
    heading : {
        level : 1,
        text : "Heading Text"
    }
};