import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";

import Sheet from "../Sheet";
import { SheetFunctionContext, WorkbookContext } from "../../context/UserContext";
import { _sort } from "../../functions/_columnDataSort";
// import { _omit } from "../../functions/_columnDataOmit";
// import { _filter } from "../../functions/_valueDataFilter";
import db from "../../utils/_db";

export default function WorkBook() {
  const { workbookMeta } = useContext(WorkbookContext);
  const { sheetFunction } = useContext(SheetFunctionContext);

  const [ sheetData, setSheetData ] = useState([]);
  const [ sheetHeader, setSheetHeader ] = useState({});

  useEffect(() => {
    const bookName = db.get("workbookContext.bookName").value();
    const sheets = db.get("workbookContext.sheets").value();
    const activeSheetIndex = db.get("workbookContext.activeSheetIndex").value();
    const sheetName = sheets[activeSheetIndex];
    fetch("http://localhost:8080/sheet/queryAll", {
      method: "post",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({db: bookName, name: sheetName}),
    }).then(s => s.json())
      .then(d => {
        setSheetData(d["sheetData"]);
        setSheetHeader(d["sheetHeader"]);
      });
    // update sheet context when workbook meta change.
    db.set("sheetContext.name", sheetName).write();
    db.set("sheetContext.fieldMeta", sheetHeader).write();
  }, [workbookMeta]);

  useEffect(() => {
    console.log("sheet function changed");
    if (_.size(sheetHeader) > 0) {
      db.set("sheetContext.fieldMeta", sheetHeader).write();
    }
    sortHandle();
    // omitHandle();
    // filterHandle();
  }, [sheetFunction]);

  return (
    <React.Fragment>
      <Sheet
        data={sheetData}
        header={sheetHeader}
        columnCount={_.size(sheetHeader)}
        rowCount={_.size(sheetData)}
      />
    </React.Fragment>
  );

  function sortHandle() {
    let sortFunction = db.get("sheetContext.functionMap.sort").value();
    if (sortFunction.enable) {
      for (let field of _.keys(sheetHeader)) {
        console.log("sort function arg: ", sortFunction.arg[field]);
        let fieldClickTimes = sortFunction.arg[field].click;
        if (fieldClickTimes % 3 !== 0) {
          let sortedSheetData = _sort(sheetData, field, sortFunction.arg[field].click);
          setSheetData(sortedSheetData);
          break;
        }
      }
    }
  }

  // function omitHandle() {
  //   let omitFunction = sheetFunction.functionMap.omit;
  //   // let fields = _.keys(omitFunction);
  //   let fields = sheetMeta.header;
  //   let omitFields = [];
  //   for (let field of fields) {
  //     if (!_.isEmpty(omitFunction[field]) && omitFunction[field].enable) {
  //       omitFields.push(field);
  //     }
  //   }
  //   if (omitFields.length > 0) {
  //     let tempSheetMeta = { ...sheetMeta };
  //     let tempSheetMetaData = [ ...tempSheetMeta.data ];
  //     let tempSheetMetaHeader = [ ...tempSheetMeta.header ];
  //     tempSheetMeta.data = _omit(tempSheetMetaData, omitFields);
  //     tempSheetMeta.header = _.difference(tempSheetMetaHeader, omitFields);
  //     tempSheetMeta.columnCount = tempSheetMeta.header.length;
  //     tempSheetMeta.rowCount = tempSheetMeta.data.length;
  //     setSheetMeta(tempSheetMeta);
  //   }
  // }
  //
  // function filterHandle() {
  //   let filterFunction = sheetFunction.functionMap.filter;
  //   let fields = sheetMeta.header;
  //   let predicateMap = {};
  //   for (let field of fields) {
  //     if (!_.isEmpty(filterFunction[field]) && !_.isEmpty(filterFunction[field].predicate)) {
  //       predicateMap[field] = filterFunction[field].predicate;
  //     }
  //   }
  //   if (_.keys(predicateMap).length > 0) {
  //     let tempSheetMeta = { ...sheetMeta };
  //     let tempSheetMetaData = [ ...tempSheetMeta.data ];
  //     tempSheetMeta.data = _filter(tempSheetMetaData, predicateMap);
  //     tempSheetMeta.rowCount = tempSheetMeta.data.length;
  //     setSheetMeta(tempSheetMeta);
  //   }
  // }

}