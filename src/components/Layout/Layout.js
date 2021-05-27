import React, { useState } from "react";
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";

// styles
import useStyles from "./styles";

import Prep from "../../pages/prep/Prep";
import Cube from "../../pages/cube/Cube";
import View from "../../pages/view/View";
import Story from "../../pages/story/Story";

import {WorkbookContext, SheetFunctionContext, WorkbookMeta, SheetFunction} from "../../context/UserContext";

function Layout() {
  const classes = useStyles();

  const [workbookMeta, setWorkbookMeta] = useState(WorkbookMeta());
  const globalWorkbookMetaContext = {workbookMeta, setWorkbookMeta};

  const [sheetFunction, setSheetFunction] = useState(SheetFunction());
  const globalSheetFunctionContext = {sheetFunction, setSheetFunction};

  return (
    <WorkbookContext.Provider value={globalWorkbookMetaContext}>
      <SheetFunctionContext.Provider value={globalSheetFunctionContext}>
        <div className={classes.root}>
          <Switch>
            <Route path="/app/prep" component={Prep} />
            <Route path="/app/cube" component={Cube} />
            <Route path="/app/view" component={View} />
            <Route path="/app/story" component={Story} />
          </Switch>
        </div>
      </SheetFunctionContext.Provider>
    </WorkbookContext.Provider>
  );
}

export default withRouter(Layout);
