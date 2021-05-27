import React, { useContext, useState } from "react";
import ReactFlow, { Controls, MiniMap } from "react-flow-renderer";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import GridOnIcon from '@material-ui/icons/GridOn';
import FunctionsIcon from '@material-ui/icons/Functions';
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Save';

import useStyles from "./styles";
import FilterIcon from "../../images/filter.svg";
import RenameIcon from "../../images/rename.svg";
import NewFieldIcon from "../../images/add.svg";
import SplitIcon from "../../images/split.svg";
import CombineIcon from "../../images/combine.svg";
import GroupIcon from "../../images/group.svg";
import SheetJoinIcon from "../../images/sheet-join.svg";
import JoinIcon from "../../images/join.svg";
import UnionIcon from "../../images/union.svg";
import SheetIcon from "../../images/sheet.svg";
import AggregationIcon from "../../images/aggregation.svg"
import CubeIcon from "../../images/cube.svg"
import ModelIcon from "../../images/model.svg";
import CleanIcon from "../../images/clean.svg";
import DbIcon from "../../images/db.svg";
import CommentIcon from "../../images/comment.svg";
import db from "../../utils/_db";
import { SheetFunctionContext } from "../../context/UserContext";

export default function BasicFlow() {
  const classes = useStyles();

  const initializeState = {
    mouseX: null,
    mouseY: null,
    etag: null
  };

  const { sheetFunction, setSheetFunction } = useContext(SheetFunctionContext);
  const [ state, setState ] = useState(initializeState);

  const handleClose = () => {
    setState(initializeState);
  };

  const elements = [
    {
      id: 'n-1',
      sourcePosition: 'right',
      type: 'input',
      style: {width: 40, height: 40, borderRadius: 20, border: "none", backgroundColor: "#DEA41B", display: "flex", alignItems: "center", justifyContent: "center", },
      data: { label: <img src={SheetIcon} alt={"icon"} className={classes.sheetIcon} data-key={""} /> },
      position: { x: 60, y: 160 },
    },
    {
      id: 'n-2',
      sourcePosition: 'right',
      targetPosition: 'left',
      style: { border: "none", borderBottom: "6px solid #017ba8", borderRadius: 0, display: "flex", alignItems: "center", justifyContent: "center", },
      data: { label: <Grid container spacing={1} alignItems={"center"} justify={"center"} data-key={"clean"}>
        <Grid item data-key={"split"} onClick={handleFunctionClick}>
          <Tooltip title={"Split"} arrow placement={"top"}>
            <img src={SplitIcon} alt="icon" className={classes.smallIcon} />
          </Tooltip>
        </Grid>
        <Grid item data-key={"filter"} onClick={handleFunctionClick} >
          <Tooltip title={"Filter"} arrow placement={"top"}>
            <img src={FilterIcon} alt="icon" className={classes.smallIcon} />
          </Tooltip>
        </Grid>
        <Grid item data-key={"combine"} onClick={handleFunctionClick}>
          <Tooltip title={"Combine"} arrow placement={"top"}>
            <img src={CombineIcon} alt="icon" className={classes.smallIcon} />
          </Tooltip>
        </Grid>
        <Grid item data-key={"rename"} onClick={handleFunctionClick}>
          <Tooltip title={"rename"} arrow placement={"top"}>
            <img src={RenameIcon} alt="icon" className={classes.smallIcon} />
          </Tooltip>
        </Grid>
      </Grid> },
      position: { x: 250, y: 160 },
    },
    {
      id: 'n-3',
      type: 'input',
      style: {width: 40, height: 40, borderRadius: 20, border: "none", backgroundColor: "#DEA41B", display: "flex", alignItems: "center", justifyContent: "center", },
      data: { label: <img src={SheetIcon} alt={"icon"} className={classes.sheetIcon} /> },
      sourcePosition: 'right',
      position: { x: 250, y: 40 },
    },
    {
      id: 'n-4',
      style: {width: 60, height: 40, border: "none", display: "flex", alignItems: "center", justifyContent: "center", },
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: <img src={SheetJoinIcon} alt={"icon"} className={classes.sheetJoin} data-key={"join"} />  },
      position: { x: 500, y: 40 },
    },
    {
      id: 'n-5',
      style: {width: 60, height: 40, border: "none", display: "flex", alignItems: "center", justifyContent: "center", },
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: <img src={AggregationIcon} alt={"icon"} className={classes.aggregationIcon} data-key={"aggregation"} /> },
      position: { x: 750, y: 40 },
    },
    {
      id: 'n-6',
      style: {width: 40, height: 40, borderRadius: 20, backgroundColor: "#017BA8", border: "none", display: "flex", alignItems: "center", justifyContent: "center", },
      type: "output",
      targetPosition: 'left',
      data: { label: <img src={ModelIcon} alt={"icon"} className={classes.smallIcon} /> },
      position: { x: 1000, y: 40 },
    },
    // source-target node
    {
      id: 'n-e1-2',
      source: 'n-1',
      type: 'straight',
      target: 'n-2',
    },
    {
      id: 'n-e2-4',
      source: 'n-2',
      type: 'straight',
      target: 'n-4',
    },
    {
      id: 'n-e3-4',
      source: 'n-3',
      type: 'straight',
      target: 'n-4',
    },
    {
      id: 'n-e4-5',
      source: 'n-4',
      type: 'straight',
      target: 'n-5',
    },
    {
      id: 'n-e5-6',
      source: 'n-5',
      type: 'straight',
      target: 'n-6',
    },
  ];

  // Fixme: how to disable other clicks
  const handleOnElementClick = (event, element) => {
    // console.log(element);
    if (element.type === "input") {
      setState({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
        etag: "input",
      })
    } else if (element.type === "default") {
      let tempEtag = event.target.dataset.key;
      setState({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
        etag: tempEtag,
      });
    } else if (element.type === "output") {
      setState({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
        etag: "output",
      })
    } else {
      console.error("unknown flow node type")
    }
  };

  // FIXME： 非 chrome 浏览器运行异常
  return (
    <>
      <ReactFlow
        elements={elements}
        defaultZoom={0.8}
        onElementClick={handleOnElementClick}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
      <Menu
        keepMounted
        open={state.mouseX !== null}
        onClose={handleClose}
        anchorReference={"anchorPosition"}
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null ? { top: state.mouseY, left: state.mouseX } : undefined
        }
        className={classes.menuContainer}
      >
        {insertMenuItem(state.etag)}
      </Menu>
    </>
  );

  function handleFunctionClick(event) {
    let funcName = event.currentTarget.dataset.key;
    // update current function enable true
    db.set(`sheetContext.functionMap.${funcName}.enable`, true).write();
    // update react sheet function context
    let temp = { ...sheetFunction };
    let tempFunction = { ...temp.functionMap[funcName] };
    tempFunction.enable = true;
    setSheetFunction(temp);
  }

  function insertMenuItem(etag) {
    let result;

    if (etag === "input") {
      result = <div>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CleanIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          数据清理
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={JoinIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          数据连接
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={UnionIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          数据并集
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FunctionsIcon className={classes.imgIcon} />
          </ListItemIcon>
          数据聚合
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CubeIcon} alt="icon" className={classes.imgIcon} />
          </ListItemIcon>
          创建模型
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CommentIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          添加备注
        </MenuItem>
      </div>;
    } else if (etag === "clean") {
      result = <div>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={JoinIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          数据连接
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={UnionIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          数据并集
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FunctionsIcon className={classes.imgIcon} />
          </ListItemIcon>
          数据聚合
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CubeIcon} alt="icon" className={classes.imgIcon} />
          </ListItemIcon>
          创建模型
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CommentIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          添加备注
        </MenuItem>
      </div>;
    } else if (etag === "join") {
      result = <div>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <GridOnIcon className={classes.imgIcon} />
          </ListItemIcon>
          添加输入
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FunctionsIcon className={classes.imgIcon} />
          </ListItemIcon>
          数据聚合
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CubeIcon} alt="icon" className={classes.imgIcon} />
          </ListItemIcon>
          创建模型
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CommentIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          添加备注
        </MenuItem>
      </div>;
    } else if (etag === "union") {
      result = <div>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <GridOnIcon className={classes.imgIcon} />
          </ListItemIcon>
          添加输入
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FunctionsIcon className={classes.imgIcon} />
          </ListItemIcon>
          数据聚合
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CubeIcon} alt="icon" className={classes.imgIcon} />
          </ListItemIcon>
          创建模型
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CommentIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          添加备注
        </MenuItem>
      </div>;
    } else if (etag === "aggregation") {
      result = <div>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CleanIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          数据清理
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={JoinIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          数据连接
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={UnionIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          数据并集
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CubeIcon} alt="icon" className={classes.imgIcon} />
          </ListItemIcon>
          创建模型
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CommentIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          添加备注
        </MenuItem>
      </div>;
    } else if (etag === "output") {
      result = <div>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SaveIcon className={classes.imgIcon} />
          </ListItemIcon>
          保存模型
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CubeIcon} alt="icon" className={classes.imgIcon} />
          </ListItemIcon>
          导出模型
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShareIcon className={classes.imgIcon} />
          </ListItemIcon>
          分享模型
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={DbIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          物化模型
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <img src={CommentIcon} alt={"icon"} className={classes.imgIcon} />
          </ListItemIcon>
          添加备注
        </MenuItem>
      </div>;
    }

    return result;
  }

}
