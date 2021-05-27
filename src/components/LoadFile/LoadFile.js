import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import useStyles from "./styles";
import LocalUploadIcon from "../../images/upload.svg";
import LocalDeleteIcon from "../../images/delete.svg";
import LocalManageIcon from "../../images/manage.svg";
import { AddSheet } from "./AddSheet";
import db from "../../utils/_db";

export function LoadFile(props) {
  const classes = useStyles();

  const [ data, setData ] = useState([]);
  const [ opState, setOpState ] = useState({
    create: false,
    delete: false,
    manage: false,
    meta: {},
  });
  const [ newWorkbookState, setNewWorkbookState ] = useState(false);

  const handleSetNewWorkbookStateCommit = () => {
    // TODO: workbook valid?
    let bookName = document.getElementById("user-workbook-name").value;
    !!bookName && fetch("http://localhost:8080/workbook/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({name: bookName}),
    }).then(s => s.toString())
      .then(d => console.log("new workbook: ", d))
      .catch(r => console.error(r));
    setNewWorkbookState(false);
  };

  const functionHandle = (event) => {
    let index = event.target.dataset.index;
    let item = data[index];
    let funcName = event.target.dataset.func;
    let tmp = { ...opState };
    tmp[funcName] = true;
    tmp.meta = item;
    setOpState(tmp);
    console.log("click handle: ", tmp);
  };

  const handleClose = () => {
    setOpState({
      create: false,
      delete: false,
      manage: false,
      meta: {},
    });
    // clear import context db message
    db.set("importContext.sheets", []).write();
    db.set("importContext.bookName", "").write();
  };

  useEffect(() => {
    fetch("http://localhost:8080/workbook/all", {
      method: "post",
      headers:{
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({}),
    })
      .then(s => s.json())
      .then(d => {
        setData(d);
      })
      .catch(r => console.error(r));
  }, [opState, newWorkbookState]);

  return (
    <Dialog
      open={props.dialogOpen}
      fullWidth
      maxWidth={"md"}
    >
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container alignItems={"center"} className={classes.grid1}>
              <Grid item xs={11}>
                编辑工作簿
              </Grid>
              <Grid item xs={1} className={classes.close}>
                <CloseIcon fontSize={"small"} onClick={props.handleSetDialogClose} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.grid2}>
            <Grid container >
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={2}>标题</Grid>
                  <Grid item xs={3}>上次打开</Grid>
                  <Grid item xs={4}>位置</Grid>
                  <Grid item xs={1}>工作表</Grid>
                  <Grid item xs={2}>操作</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {data.map((it, index) => (
                  <Grid container alignItems={"center"} key={index} className={ index % 2 === 0 ? classes.oddLine : classes.evenLine}>
                    <Grid item xs={2}>
                      <p className={classes.bookName}>{it.name}</p>
                    </Grid>
                    <Grid item xs={3}>{it.lastModified}</Grid>
                    <Grid item xs={4}>{it.path}</Grid>
                    <Grid item xs={1}>{it.sheetSize}</Grid>
                    <Grid item xs={2}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Tooltip title={"添加工作表"}>
                            <img
                              src={LocalUploadIcon}
                              alt="icon"
                              data-index={index}
                              data-func={"create"}
                              onClick={functionHandle}
                              className={classes.smallIcon}
                            />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={4}>
                          <Tooltip title={"删除工作簿"}>
                            <img
                              src={LocalDeleteIcon}
                              alt="icon"
                              data-index={index}
                              data-func={"delete"}
                              onClick={functionHandle}
                              className={classes.smallIcon}
                            />
                          </Tooltip>
                        </Grid>
                        <Grid item xs={4}>
                          <Tooltip title={"管理工作表"}>
                            <img
                              src={LocalManageIcon}
                              alt="icon"
                              data-index={index}
                              data-func={"manage"}
                              onClick={functionHandle}
                              className={classes.smallIcon}
                            />
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems={"center"} className={classes.grid3}>
              <Grid item xs={10}>
                <b>{data.length}</b> workbook(s)
              </Grid>
              <Grid item xs={2}>
                <Button
                  size={"small"}
                  fullWidth
                  color={"primary"}
                  variant={"contained"}
                  onClick={() => setNewWorkbookState(true)}
                  disableElevation
                >
                  新建
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div>
        <AddSheet opState={opState} handleClose={handleClose} />
      </div>
      <div>
        <Dialog
          open={newWorkbookState}
          fullWidth
          maxWidth={"xs"}
          aria-describedby={"new-workbook-dialog"}
        >
          <Grid container>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} className={classes.grid1}>
                <Grid item xs={11}>
                  新建工作簿
                </Grid>
                <Grid item xs={1} className={classes.close}>
                  <CloseIcon fontSize={"small"} onClick={() => setNewWorkbookState(false)} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} className={classes.grid3}>
                <Grid item xs={12}>
                  <InputBase
                    autoFocus={true}
                    fullWidth={true}
                    placeholder={"请输入工作簿名称"}
                    id={"user-workbook-name"}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} className={classes.grid3}>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    size={"small"}
                    fullWidth
                    color={"primary"}
                    variant={"contained"}
                    onClick={handleSetNewWorkbookStateCommit}
                    disableElevation
                  >
                    保存
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
        <Dialog
          open={opState.delete}
          fullWidth
          maxWidth={"xs"}
          aria-describedby={"delete-workbook-dialog"}
        >
          <Grid container>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} className={classes.grid1}>
                <Grid item xs={11}>
                  删除工作簿
                </Grid>
                <Grid item xs={1} className={classes.close}>
                  <CloseIcon fontSize={"small"} onClick={handleClose} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} className={classes.grid3}>
                <Grid item xs={12}>
                  <Button
                    disableRipple
                    disableElevation
                    startIcon={<HighlightOffIcon color={"error"} fontSize={"small"} />}
                  >
                    {opState.meta.name} 删除后不可恢复！
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} className={classes.grid3}>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    size={"small"}
                    fullWidth
                    color={"primary"}
                    variant={"contained"}
                    onClick={deleteWorkbook}
                    disableElevation
                  >
                    删除
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
        <Dialog
          open={opState.manage}
          onClose={handleClose}
          fullWidth
          maxWidth={"xs"}
          aria-describedby={"manage-workbook-dialog"}
        >
          <Grid container>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} className={classes.grid1}>
                <Grid item xs={11}>
                  工作簿概览
                </Grid>
                <Grid item xs={1} className={classes.close}>
                  <CloseIcon fontSize={"small"} onClick={handleClose} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} className={classes.grid3}>
                <Grid item xs={12}>
                  <Button
                    disableRipple
                    disableElevation
                    startIcon={<HighlightOffIcon color={"error"} />}
                  >
                    {opState.meta.name} ？
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems={"center"} className={classes.grid3}>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2}>
                  {/*<Button*/}
                  {/*  size={"small"}*/}
                  {/*  fullWidth*/}
                  {/*  color={"primary"}*/}
                  {/*  variant={"contained"}*/}
                  {/*  onClick={deleteWorkbook()}*/}
                  {/*  disableElevation*/}
                  {/*>*/}
                  {/*  删除*/}
                  {/*</Button>*/}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    </Dialog>
  );

  function deleteWorkbook() {
    let bookName = opState.meta.name;
    !!bookName && fetch("http://localhost:8080/workbook/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({name: bookName}),
    }).then(s => s.toString())
      .then(d => console.log("delete workbook: ", d))
      .catch(r => console.error(r));
    handleClose();
  }
}