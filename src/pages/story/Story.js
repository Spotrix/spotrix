import React, { useState } from "react";
import SplitPane from "react-split-pane";
// import Grid from "@material-ui/core/Grid";

import "./panel.css";
import useStyles from "./styles";


export default function Story() {
  const classes = useStyles();

  const [ size, setSize ] = useState(200);
  const maxHeight = window.innerHeight - 400;

  const handleDrag = (number) => {
    setSize(number);
  };

  return (
    <div className={classes.root}>
      <div style={{height: size,  width: "100vw", maxHeight: maxHeight, backgroundColor: "#123456"}}>
        <SplitPane
          split="horizontal"
          minSize={50}
          maxSize={maxHeight}
          defaultSize={size}
          onDragFinished={handleDrag}
        >
          1
        </SplitPane>
      </div>
      <div style={{top: 200, height: 200, position: "absolute", zIndex: -1, width: "100vw", borderBottom: "1px solid #5f6368"}}>
        2
      </div>
      <div style={{top: 400, height: 200, position: "absolute", zIndex: -1, width: "100vw", borderBottom: "1px solid #5f6368"}}>
        3
      </div>

      {/*<Grid container direction={"column"}>*/}
      {/*  <Grid item style={{height: size,  width: "100vw", maxHeight: maxHeight}}>*/}
      {/*    <SplitPane*/}
      {/*      split="horizontal"*/}
      {/*      minSize={50}*/}
      {/*      maxSize={maxHeight}*/}
      {/*      defaultSize={size}*/}
      {/*      onDragFinished={handleDrag}*/}
      {/*    >*/}
      {/*      1*/}
      {/*    </SplitPane>*/}
      {/*  </Grid>*/}
      {/*  <Grid item style={{top: size, height: 200, position: "absolute", width: "100vw", borderBottom: "1px solid #5f6368"}}>*/}
      {/*    2*/}
      {/*  </Grid>*/}
      {/*  <Grid item style={{top: 200 + size, height: 200, position: "absolute", width: "100vw", borderBottom: "1px solid #5f6368"}}>*/}
      {/*    3*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
    </div>
  );
}