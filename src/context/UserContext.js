import React from "react";

export const WorkbookContext = React.createContext({});
export const SheetFunctionContext = React.createContext({});

export function WorkbookMeta() {
  // one context can only existed in one workbook
  return {
    bookName: "",
    sheetName: "",
    sheets: [],
  };
}

export function SheetFunction() {
  return {
    name: "",
    fieldMeta: {},
    functionMap: {
      omit: {},
      sort: {},
      filter: {},
      rename: {},
      new: {},
      split: {},
      combine: {},
      group: {},
      join: {},
      union: {},
    },
  };
}
