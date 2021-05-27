/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import DoneIcon from '@material-ui/icons/Done';
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Save';
import ListItemIcon from "@material-ui/core/ListItemIcon";

import useStyle from "./styles";
import BasicFlow from "../Flow";

export function VisualizationFlow() {
  const classes = useStyle();
  const initializeState = {
    mouseX: null,
    mouseY: null,
  };

  const [ state, setState ] = useState(initializeState);

  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initializeState);
  };

  return (
    <div onContextMenu={handleClick}>
      <Card elevation={0} variant={"outlined"} square className={classes.gridCard10}>
        <BasicFlow />
      </Card>
      <Menu
        keepMounted
        open={state.mouseY != null}
        onClose={handleClose}
        anchorReference={"anchorPosition"}
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null ? { top: state.mouseY, left: state.mouseX } : undefined
        }
        className={classes.menuContainer}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            {/*<DoneIcon className={classes.tinyIcon} />*/}
          </ListItemIcon>
          全屏模式
        </MenuItem>
        <Divider className={classes.dividerGap} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SaveIcon className={classes.tinyIcon} />
          </ListItemIcon>
          保存模型
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShareIcon className={classes.tinyIcon} />
          </ListItemIcon>
          分享模型
        </MenuItem>
        <Divider className={classes.dividerGap} />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DoneIcon className={classes.tinyIcon} />
          </ListItemIcon>
          开启控制器
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DoneIcon className={classes.tinyIcon} />
          </ListItemIcon>
          开启小窗口
        </MenuItem>
      </Menu>
    </div>
  );
}