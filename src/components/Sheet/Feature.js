import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import MonacoEditor from "react-monaco-editor/lib/editor";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import useStyles from "./styles";
import { Summary } from "../Summary";
import DefaultSort from "../../images/default.svg";
import AscendingSort from "../../images/up.svg";
import DescendingSort from "../../images/down.svg";
import { SheetFunctionContext } from "../../context/UserContext";
import { _summary } from "../../functions/_headerDataSummary";
import { getTypes, typeMapper } from "../../utils/_trixType";
import db from "../../utils/_db";

export function Feature(props) {
  const classes = useStyles();

  const {sheetFunction, setSheetFunction} = useContext(SheetFunctionContext);
  const dataSummary = _summary(props);

  const handleFieldSorting = (event) => {
    let field = event.target.dataset.name;
    let sortFunction = db.get("sheetContext.functionMap.sort").value();
    if (!!_.get(sortFunction.arg, field)) {
      console.log(field, sortFunction.arg[field]);
    } else {
      sortFunction.arg[field] = {};
    }
    let functionFieldArg = sortFunction.arg[field];
    if (!!_.get(functionFieldArg, "click")) {
      functionFieldArg["click"] ++;
    } else {
      functionFieldArg["click"] = 1;
    }
    db.set("sheetContext.functionMap.sort", sortFunction).write();

    // visit fields clicks, set enable is true if click times
    let tmpArgValues = _.values(db.get("sheetContext.functionMap.sort.arg").value());
    let times = _.sum(_.map(tmpArgValues, "click"));
    sortFunction["enable"] = times % 3 !== 0;
    db.set("sheetContext.functionMap.sort", sortFunction).write();

    // update sheet function in react context
    let item = { ...sheetFunction  };
    item.functionMap.sort = db.get("sheetContext.functionMap.sort").value();
    setSheetFunction(item);
  };

  const editorChangeHandle = (newValue, e) => {
    console.log(newValue);
  };

  const editorDidMount = (editor, monaco) => {
    editor.focus();
  };

  return (
    <Card elevation={0} variant={"outlined"} square className={ _.isEmpty(props.cardRole) ? classes.gridCard12 : classes.gridCard120}>
      <div className={classes.dataSummary}>
        {
          dataSummary.map(it => (
            <Card elevation={0} className={_.isEmpty(props.cardRole) ? classes.dataSummaryCard : classes.dataSummaryCardX} key={it.name}>
              <Grid container alignItems={"center"}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <Select
                      disableUnderline
                      value={typeMapper(it.type)}
                      defaultValue={"string"}
                      onChange={changeColumnType}
                    >
                      {_.keys(getTypes()).map(key => (
                        <MenuItem value={key} key={key} className={classes.typeItem}>
                          <img src={getTypes()[key].icon} alt="column-type" className={classes.typeImg} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={7}>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={1}>
                  <img
                    src={getSortImg(it.name)}
                    alt="sort"
                    data-name={it.name}
                    className={classes.smallImg}
                    onClick={handleFieldSorting}
                  />
                </Grid>
              </Grid>
              <p className={classes.columnName}>{it.name}<span className={classes.columnCount}>{it.uniqCount}</span></p>
              <Divider />
              {_.isEmpty(props.cardRole) ?
                // feature data: display default
                <Summary type={it.type} sample={it.sample} uniqCount={it.uniqCount} nullCount={it.nullCount} />
                :
                // sample data
                <MonacoEditor
                  language={"sql"}
                  theme={"vs-light"}
                  value={getSampleData(it.name)}
                  options={{contextmenu: false, lineNumbers: "off"}}
                  onChange={editorChangeHandle}
                  editorDidMount={editorDidMount}
                />
              }
            </Card>
          ))
        }
      </div>
    </Card>
  );

  function getSortImg(field) {
    let functionArg = db.get("sheetContext.functionMap.sort.arg").value();
    if (!!_.get(functionArg, field)) {
      switch (functionArg[field].click % 3) {
        case 0:
          return DefaultSort;
        case 1:
          return AscendingSort;
        case 2:
          return DescendingSort;
        default:
          return DefaultSort;
      }
    } else {
      return DefaultSort;
    }
  }

  function getSampleData(field) {
    let tmpData = _.take(props.data, 100);
    return _.join(_.map(tmpData, field), "\n");
  }

  function changeColumnType(event) {
    console.log(event.target.value);
  }
}