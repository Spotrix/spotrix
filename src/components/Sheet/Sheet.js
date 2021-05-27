import React, { useContext, useEffect } from "react";
import { AutoSizer, Grid as DataGrid } from "react-virtualized";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import _ from "lodash";

import { WorkbookContext } from "../../context/UserContext";
import useStyle from "./styles";
import CubeAdv from "../../images/cube-adv.svg";
import { TinyNav } from "./TinyNav";
import { Feature } from "./Feature";
import { FilterValue } from "../FilterValue";
import { NewField } from "../NewField";
import { RenameField } from "../RenameField";
import { SplitField } from "../SplitField";
import { CombineField } from "../CombineField";
import { GroupField } from "../GroupField";
import { JoinSheet } from "../JoinSheet";
import { UnionSheet } from "../UnionSheet";
import { VisualizationFlow } from "./VisualizationFlow";

export default function Sheet(props) {
  const data = props.data;
  const header = _.keys(props.header);
  const columnCount = props.columnCount;
  const rowCount = props.rowCount;

  const { workbookMeta } = useContext(WorkbookContext);

  const classes = useStyle();
  const rowHeight = 24;
  const columnWidth = 120;
  // 20vh
  const gridHeight = window.innerHeight / 10 * 2;

  const handleSetCellIndex = (event) => {
    let cellIndex = event.target.dataset.index;
    console.log(cellIndex);
  };

  useEffect(() => {
    let sheetNode = document.getElementById("sheet-data");
    sheetNode.addEventListener("click", handleSetCellIndex);

    return () => {
      sheetNode.removeEventListener("click", handleSetCellIndex);
    }
  }, [workbookMeta]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item style={{width: "98vw"}}>
          <Grid container direction={"column"}>
            <Grid item xs={12}>
              <VisualizationFlow />
            </Grid>
            <Grid item xs={12}>
              <TinyNav columnCount={columnCount} rowCount={rowCount} />
            </Grid>
            <Grid item xs={12}>
              <Feature data={data} header={props.header} columnCount={columnCount} rowCount={rowCount} />
            </Grid>
            <Grid item xs={12}>
              <Card elevation={0} variant={"outlined"} square className={classes.gridCard13} id="sheet-data">
                <AutoSizer disableHeight>
                  {({width}) => (
                    <DataGrid
                      cellRenderer={cellRenderer}
                      columnCount={columnCount}
                      columnWidth={columnWidth}
                      height={gridHeight}
                      rowCount={rowCount}
                      rowHeight={rowHeight}
                      width={width}
                      className={classes.gridData}
                    />
                  )}
                </AutoSizer>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: "2vw"}}>
          <Grid container direction={"column"} alignItems={"center"} className={classes.gridCard2}>
            <Grid item xs={12}>
              <img src={CubeAdv} width={16} alt="chart-adv" />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FilterValue />
      <NewField />
      <RenameField data={props.data} header={props.header} />
      <SplitField data={props.data} header={props.header} columnCount={props.columnCount} rowCount={props.rowCount} />
      <CombineField data={props.data} header={props.header} columnCount={props.columnCount} rowCount={props.rowCount} />
      <GroupField data={props.data} header={props.header} columnCount={props.columnCount} rowCount={props.rowCount} />
      <JoinSheet data={props.data} header={props.header} columnCount={props.columnCount} rowCount={props.rowCount} />
      <UnionSheet data={props.data} header={props.header} columnCount={props.columnCount} rowCount={props.rowCount} />
    </div>
  );

  function cellRenderer({columnIndex, key, rowIndex, style}) {
    return renderBodyCell({columnIndex, key, rowIndex, style});
  }

  function renderBodyCell({columnIndex, key, rowIndex, style}) {
    const datum = getDatum(rowIndex);

    let field = header[columnIndex];
    // fixme: boolean can not display
    let content = datum[field];

    return (
      <div className={classes.cell} key={key} style={style} data-index={(rowIndex+1) + ":" + (columnIndex+1)}>
        {content}
      </div>
    );
  }

  function getDatum(index) {
    return data[index];
  }
}

