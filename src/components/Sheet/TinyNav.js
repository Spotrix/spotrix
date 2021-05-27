import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";
import Hidden from "@material-ui/core/Hidden";

import useStyles from "./styles";
import FilterIcon from "../../images/filter.svg";
import RenameIcon from "../../images/rename.svg";
import AddIcon from "../../images/add.svg";
import SplitIcon from "../../images/split.svg";
import CombineIcon from "../../images/combine.svg";
import GroupIcon from "../../images/group.svg";
import JoinIcon from "../../images/join.svg";
import UnionIcon from "../../images/union.svg";
import { SheetFunctionContext } from "../../context/UserContext";
import db from "../../utils/_db";

export function TinyNav(props) {
  const classes = useStyles();

  const {sheetFunction, setSheetFunction} = useContext(SheetFunctionContext);

  const handleOpenFunction = (event) => {
    let funcName = event.currentTarget.dataset.func;
    // update current function enable true
    db.set(`sheetContext.functionMap.${funcName}.enable`, true).write();
    // update react sheet function context
    let temp = { ...sheetFunction };
    let tempFunction = { ...temp.functionMap[funcName] };
    tempFunction.enable = true;
    setSheetFunction(temp);
  };

  return (
    <Card elevation={0} square className={classes.gridCard11}>
      <Grid container alignItems={"center"}>
        <Grid item xs={10}>
          <Grid container spacing={0} alignItems={"center"}>
            <Grid item className={classes.gridItem}>
              {props.columnCount} 列，{props.rowCount} 行
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item className={classes.gridItem}>
              <Button
                size={"small"}
                startIcon={<img src={FilterIcon} alt={"icon"} className={classes.smallTool} />}
                data-func={"filter"}
                onClick={handleOpenFunction}
                className={classes.buttonText}
              >
                Filter Values
              </Button>
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item className={classes.gridItem}>
              <Button
                size={"small"}
                startIcon={<img src={RenameIcon} alt={"icon"} className={classes.smallTool} />}
                data-func={"rename"}
                onClick={handleOpenFunction}
                className={classes.buttonText}
              >
                Rename Field
              </Button>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Button
                size={"small"}
                startIcon={<img src={AddIcon} alt={"icon"} className={classes.smallTool} />}
                data-func={"new"}
                onClick={handleOpenFunction}
                className={classes.buttonText}
              >
                New Field
              </Button>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Button
                size={"small"}
                startIcon={<img src={SplitIcon} alt={"icon"} className={classes.smallTool} />}
                data-func={"split"}
                onClick={handleOpenFunction}
                className={classes.buttonText}
              >
                Split Field
              </Button>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Button
                size={"small"}
                startIcon={<img src={CombineIcon} alt={"icon"} className={classes.smallTool} />}
                data-func={"combine"}
                onClick={handleOpenFunction}
                className={classes.buttonText}
              >
                Combine Field
              </Button>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Button
                size={"small"}
                startIcon={<img src={GroupIcon} alt={"icon"} className={classes.smallTool} />}
                data-func={"group"}
                onClick={handleOpenFunction}
                className={classes.buttonText}
              >
                Group Field
              </Button>
            </Grid>
            <Grid item>
              <Hidden mdDown>
                <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
              </Hidden>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Hidden mdDown>
                <Button
                  size={"small"}
                  startIcon={<img src={JoinIcon} alt={"icon"} className={classes.smallTool} />}
                  data-func={"join"}
                  onClick={handleOpenFunction}
                  className={classes.buttonText}
                >
                  Join Sheet
                </Button>
              </Hidden>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Hidden mdDown>
                <Button
                  size={"small"}
                  startIcon={<img src={UnionIcon} alt={"icon"} className={classes.smallTool} />}
                  data-func={"union"}
                  onClick={handleOpenFunction}
                  className={classes.buttonText}
                >
                  Union Sheet
                </Button>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <InputBase fullWidth endAdornment={<SearchIcon className={classes.smallTool} />} className={classes.gridDataSearch} />
        </Grid>
      </Grid>
    </Card>
  );
}