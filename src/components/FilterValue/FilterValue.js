import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import MonacoEditor from "react-monaco-editor/lib/editor";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./styles";
import { SheetFunctionContext } from "../../context/UserContext";
import { getSchemaFunctions } from "../../utils/_trixFunctions";
import db from "../../utils/_db";

export function FilterValue() {
  const classes = useStyles();

  const {sheetFunction, setSheetFunction} = useContext(SheetFunctionContext);

  const [func, setFunc] = useState(getSchemaFunctions()[0]);

  const handleClose = () => {
    // update current function enable true
    db.set("sheetContext.functionMap.filter.enable", false).write();
    // update react sheet function context
    let temp = { ...sheetFunction };
    let tempFunction = { ...temp.functionMap.filter };
    tempFunction.enable = false;
    setSheetFunction(temp);
  };

  const handleApply = () => {
    // todo: get user input edit function
    console.log("todo: get user input edit function.");
  };

  const editorChangeHandle = (newValue, e) => {
    console.log(newValue);
  };

  const editorDidMount = (editor, monaco) => {
    editor.focus();
  };

  return (
    <Dialog
      open={db.get("sheetContext.functionMap.filter.enable").value()}
      fullWidth
      maxWidth={"md"}
    >
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container alignItems={"center"} className={classes.grid1}>
              <Grid item xs={11}>
                编辑筛选器
              </Grid>
              <Grid item xs={1} className={classes.close}>
                <CloseIcon fontSize={"small"} onClick={handleClose} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems={"center"} className={classes.grid2}>
              <Grid item xs={5}>计算</Grid>
              <Grid item xs={1}>
                <FormControl fullWidth>
                  <Select
                    disableUnderline
                    defaultValue={0}
                  >
                    <MenuItem value={0}><span className={classes.itemName}>快速筛选</span></MenuItem>
                    <MenuItem value={1}><span className={classes.itemName}>高级筛选</span></MenuItem>
                    <MenuItem value={2}><span className={classes.itemName}>自定义</span></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3} className={classes.functionReferrer}>引用</Grid>
              <Grid item xs={4} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems={"center"} className={classes.grid3}>
              <Grid item xs={6}>
                <Card elevation={0} variant={"outlined"} square className={classes.grid31} id="edit-area">
                  <MonacoEditor
                    language={"sql"}
                    theme={"vs-light"}
                    value={func.name}
                    options={{contextmenu: false}}
                    onChange={editorChangeHandle}
                    editorDidMount={editorDidMount}
                  />
                </Card>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.grid32}>
                  <Grid container direction={"column"}>
                    <Grid item xs={12}>
                      <InputBase fullWidth={true} defaultValue={"All"} className={classes.grid321} />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Card elevation={0} variant={"outlined"} square className={classes.grid322}>
                      <Grid container direction={"column"}>
                        {getSchemaFunctions().map(func => (
                          <Grid item xs={12} key={func.name} className={classes.functionHover} onClick={() => setFunc(func)}>
                            <span>
                              {func.name}
                            </span>
                          </Grid>
                        ))}
                      </Grid>
                    </Card>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={3}>
                <Card elevation={0} className={classes.grid33}>
                  <p className={classes.functionName}>{func.name}</p>
                  <p className={classes.functionDesc}>{func.return}</p>
                  <p className={classes.functionDemo}>Example：{func.example}</p>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems={"center"} className={classes.grid4}>
              <Grid item xs={10}>
                计算有效
              </Grid>
              <Grid item xs={2}>
                <Button
                  size={"small"}
                  fullWidth
                  color={"primary"}
                  variant={"contained"}
                  onClick={handleApply}
                  disableElevation
                >
                  应用
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  )
}