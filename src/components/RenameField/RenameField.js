import React, { useContext } from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
// import LinearProgress from "@material-ui/core/LinearProgress";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import useStyles from "./styles";
import { SheetFunctionContext } from "../../context/UserContext";
import { getTypes } from "../../utils/_trixType";
import FieldIcon from "../../images/field.svg";
import AdviseIcon from "../../images/advise.svg";
import db from "../../utils/_db";

export function RenameField(props) {
  const classes = useStyles();

  const {sheetFunction, setSheetFunction} = useContext(SheetFunctionContext);

  const handleClose = () => {
    // update current function enable true
    db.set("sheetContext.functionMap.rename.enable", false).write();
    // update react sheet function context
    let temp = { ...sheetFunction };
    let tempFunction = { ...temp.functionMap.rename };
    tempFunction.enable = false;
    setSheetFunction(temp);
  };

  return (
    <Drawer
      open={db.get("sheetContext.functionMap.rename.enable").value()}
      anchor={"bottom"}
    >
      <div className={classes.root}>
        <Grid container>
          <Grid item className={classes.part1}>
            <Grid container alignItems={"center"}>
              <Grid item xs={11}>
                <Grid container alignItems={"center"}>
                  <Grid item xs={9}>
                    <span className={classes.title}>SheetName</span>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton size={"small"} disableFocusRipple disabled className={classes.adviseTip}>
                      <img src={AdviseIcon} alt="column-type" className={classes.adviseImg} />
                      0 个建议
                    </IconButton>
                  </Grid>
                  <Grid item xs={2}>
                    <InputBase fullWidth endAdornment={<SearchIcon className={classes.smallTool} />} className={classes.gridDataSearch} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} className={classes.close}>
                <CloseIcon fontSize={"small"} onClick={handleClose} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.part2}>
            {fieldMeta().map(meta => (
              <Grid container alignItems={"center"} className={classes.fieldMeta} key={meta.fieldName}>
                <Grid item xs={1}>
                  <IconButton size={"small"} disableFocusRipple>
                    <img src={FieldIcon} alt="column-type" className={classes.typeImg} />
                  </IconButton>
                </Grid>
                <Grid item xs={8}>{meta.fieldName}</Grid>
                <Grid item xs={3}>{meta.fieldSize}</Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item className={classes.part3}>
            {/*<LinearProgress color={"secondary"} className={classes.linearProcess} />*/}
            {fieldInfos().map((info, index) => (
              <Grid container alignItems={"center"} className={classes.partTable} key={index}>
                <Grid item xs={1}>
                  <Checkbox
                    size={"small"}
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                  />
                </Grid>
                <Grid item xs={1} className={index === 0 ? classes.headerCell : classes.bodyCell}>
                  {index === 0 ?
                    info.fieldType
                    :
                    <div className={classes.typeItem}>
                      <IconButton size={"small"} disableFocusRipple>
                        <img src={getTypes()[info.fieldType].icon} alt="column-type" className={classes.typeImg} />
                      </IconButton>
                      <span>{info.fieldType.name}</span>
                    </div>
                  }
                </Grid>
                <Grid item xs={2} className={index === 0 ? classes.headerCell : classes.bodyCell}>
                  {info.fieldShortName}
                </Grid>
                <Grid item xs={2} className={index === 0 ? classes.headerCell : classes.bodyCell}>
                  {info.fieldOrigName}
                </Grid>
                <Grid item xs={4} className={index === 0 ? classes.headerCell : classes.bodyCell}>
                  {info.valueExample}
                </Grid>
                <Grid item xs={2} className={index === 0 ? classes.headerCell : classes.bodyCell}>
                  {info.remark}
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );

  function fieldInfos() {
    let result = [
      {
        fieldType: "类型",
        fieldShortName: "字段名称",
        fieldOrigName: "原始字段名称",
        valueExample: "示例值",
        remark: "备注",
      }
    ];
    let tmpData = _.take(props.data, 3);
    for (let field of _.keys(props.header)) {
      let example = _.join(_.map(tmpData, field), ", ");
      result.push({
        fieldType: "string",
        fieldShortName: field,
        fieldOrigName: field,
        valueExample: example,
        remark: "",
      })
    }
    return result;
  }

  function fieldMeta() {
    let result = [];
    for (let field of _.keys(props.header)) {
      result.push({
        fieldName: field,
        fieldType: "string",
        fieldSize: _.ceil(Math.random() * 10, 2) + " kb",
      });
    }
    return result;
  }
}