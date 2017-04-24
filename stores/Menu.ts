export interface HeadingStore {
        level: 1 | 2 | 3 | 4 | 5 | 6;
        text: string;
}

export interface MenuStore {
    heading: HeadingStore;
    code: {language: string};
    import: {
        file?: File;
        importing: boolean;
    };
    load: {file?: File};
    table: {
        rows: number;
        columns: number;
    };
}

export let initialState: MenuStore = {
    code : {
        language : "html-css-javascript",
    },
    heading : {
        level : 1,
        text : "",
    },
    import: {
        importing: false,
    },
    load : {},
    table: {
        columns: 0,
        rows: 0,
    },
};
