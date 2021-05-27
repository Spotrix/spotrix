import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";

import useStyles from "./styles";
import db from "../../utils/_db";
import { WorkbookContext } from "../../context/UserContext";
// import StandardModel from "../../images/standard.svg";
import ActiveStandardModel from "../../images/standard-active.svg";
import FlowModel from "../../images/flow.svg";
import GridModel from "../../images/grid.svg";

export default function Footer() {
  const classes = useStyles();

  const { workbookMeta, setWorkbookMeta } = useContext(WorkbookContext);

  const [ activeIndex, setActiveIndex ] = useState(db.get("workbookContext.activeSheetIndex").value());

  const handleSheetSelector = (event) => {
    let clickedSheetIndex = event.target.value;
    setActiveIndex(clickedSheetIndex);
    db.set("workbookContext.activeSheetIndex", clickedSheetIndex).write();
    let temp = { ...workbookMeta };
    temp.bookName = db.get("workbookContext.bookName").value();
    temp.sheetName = db.get("workbookContext.sheets").value()[clickedSheetIndex];
    setWorkbookMeta(temp);
  };

  return (
    <div
      id={"footer"}
      className={classes.root}
    >
      <Grid container alignItems={"center"} className={classes.footerGrid}>
        <Grid item xs={7} className={classes.gridItem}>
          {db.get("workbookContext.sheets").value().length > 0 ?
            <Select
              value={activeIndex}
              onChange={handleSheetSelector}
              disableUnderline
              className={classes.menuItemName}
            >
              {db.get("workbookContext.sheets").value().map((sheet, index) => (
                index === db.get("workbookContext.activeSheetIndex").value() ?
                  <MenuItem
                    key={index}
                    value={index}
                    data-index={index}
                    className={classes.menuItemActiveName}
                  >
                    {sheet}
                  </MenuItem>
                  :
                  <MenuItem
                    key={index}
                    value={index}
                    data-index={index}
                    className={classes.menuItemName}
                  >
                    {sheet}
                  </MenuItem>
              ))}
            </Select>
            : null
          }
        </Grid>
        <Grid item xs={2}>
          <Grid container alignItems={"center"}>
            <Grid item xs={2}>
              View:
            </Grid>
            <Grid item>
              {/*<img src={StandardModel} alt="logo" className={classes.iconTool} />*/}
              <img src={ActiveStandardModel} alt="logo" className={classes.iconTool} />
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <img src={FlowModel} alt="logo" className={classes.iconTool} />
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <img src={GridModel} alt="logo" className={classes.iconTool} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            <Grid item className={classes.gridItem}>
              {db.get("workbookContext.activeCellIndex").value()}
            </Grid>
            <Grid item className={classes.gridItem}>
              LF
            </Grid>
            <Grid item className={classes.gridItem}>
              {db.get("workbookContext.encoding").value()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          Event Log
        </Grid>
      </Grid>
    </div>
  );
}