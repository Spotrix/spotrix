import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

const adapter = new LocalStorage('db');
const db = low(adapter);

db.defaults({
    workbookContext: {
        bookName: "",
        position: "",
        sheets: [],
        activeSheetIndex: 0,
        activeCellIndex: "0:0",
        encoding: "UTF-8",
      }
}).write();

db.defaults({
    sheetContext: {
        name: "",
        fieldMeta: {},
        functionMap: {
            omit: {
                enable: false,
                arg: {},
            },
            sort: {
                enable: false,
                arg: {},
            },
            filter: {
                enable: false,
                arg: {},
            },
            rename: {
                enable: false,
                arg: {},
            },
            new: {
                enable: false,
                arg: {},
            },
            split: {
                enable: false,
                arg: {},
            },
            combine: {
                enable: false,
                arg: {},
            },
            group: {
                enable: false,
                arg: {},
            },
            join: {
                enable: false,
                arg: {},
            },
            union: {
                enable: false,
                arg: {},
            },
        },
    }
}).write();

db.defaults({
    importContext: {
        bookName: "",
        sheets: [],
    }
}).write();

export default db;