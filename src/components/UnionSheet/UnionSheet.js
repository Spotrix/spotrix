import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import InputBase from "@material-ui/core/InputBase";

import useStyles from "./styles";
import { SheetFunctionContext } from "../../context/UserContext";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import AdviseIcon from "../../images/advise.svg";
import db from "../../utils/_db";

export function UnionSheet() {
  const classes = useStyles();

  const {sheetFunction, setSheetFunction} = useContext(SheetFunctionContext);

  const handleClose = () => {
    // update current function enable true
    db.set("sheetContext.functionMap.union.enable", false).write();
    // update react sheet function context
    let temp = { ...sheetFunction };
    let tempFunction = { ...temp.functionMap.union };
    tempFunction.enable = false;
    setSheetFunction(temp);
  };

  return (
    <Drawer
      open={db.get("sheetContext.functionMap.union.enable").value()}
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
          </Grid>
          <Grid item className={classes.part3}>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  )
}