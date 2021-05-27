import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import InputBase from "@material-ui/core/InputBase";
import _ from "lodash";
// import LinearProgress from "@material-ui/core/LinearProgress";
import Checkbox from "@material-ui/core/Checkbox";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

import useStyles from "./styles";
import { SheetFunctionContext } from "../../context/UserContext";
import AdviseIcon from "../../images/advise.svg";
import FieldIcon from "../../images/field.svg";
import { getTypes } from "../../utils/_trixType";
import { Feature } from "../Sheet/Feature";
import db from "../../utils/_db";

export function CombineField(props) {
  const classes = useStyles();

  const {sheetFunction, setSheetFunction} = useContext(SheetFunctionContext);

  const handleClose = () => {
    // update current function enable true
    db.set("sheetContext.functionMap.combine.enable", false).write();
    // update react sheet function context
    let temp = { ...sheetFunction };
    let tempFunction = { ...temp.functionMap.combine };
    tempFunction.enable = false;
    setSheetFunction(temp);
  };

  return (
    <Drawer
      open={db.get("sheetContext.functionMap.combine.enable").value()}
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
            <div className={classes.part21}>

            </div>
            <div className={classes.part22}>
              <Grid container alignItems={"center"}>
                {fieldMeta().map((meta, index) => (
                  index === 0 ?
                    <span key={index}>字段说明</span>
                    :
                    <Grid item xs={12} key={index}>
                      <Grid container alignItems={"center"} className={classes.fieldMeta}>
                        <Grid item xs={1}>
                          <Checkbox
                            size={"small"}
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton size={"small"} disableFocusRipple>
                            <img src={FieldIcon} alt="column-type" className={classes.typeImg} />
                          </IconButton>
                        </Grid>
                        <Grid item xs={7}>{meta.fieldName}</Grid>
                        <Grid item xs={3}>
                          {meta.fieldSize}
                        </Grid>
                      </Grid>
                    </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
          <Grid item className={classes.part3}>
            {/*<LinearProgress color={"secondary"} className={classes.linearProcess} />*/}
            <Grid container>
              <Grid item xs={12}>
                <Feature cardRole={"sample"} data={props.data} header={props.header} columnCount={props.columnCount} rowCount={props.rowCount} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );

  function fieldMeta() {
    let result = [{}];
    for (let field of _.keys(props.header)) {
      result.push({
        fieldName: field,
        fieldType: getTypes()[0],
        fieldSize: _.ceil(Math.random() * 10, 2) + " kb",
      });
    }
    return result;
  }
}