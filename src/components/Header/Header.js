import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from '@material-ui/icons/Save';
import FunctionsIcon from '@material-ui/icons/Functions';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Menu from "@material-ui/core/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RefreshIcon from '@material-ui/icons/Refresh';
import ShareIcon from "@material-ui/icons/Share";

import useStyles from "./styles";
import Logo from "../../images/logo.svg";
import Cube from "../../images/cube.svg";

export default function Header() {
  const classes = useStyles();

  const [functionAnchorEl, setFunctionAnchorEl] = useState(null);

  const handleFunctionClick = (event) => {
    setFunctionAnchorEl(event.currentTarget);
  };

  const handleFunctionClose = () => {
    setFunctionAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.tool}>
          <Grid container direction={"row"} className={classes.toolItems}>
            <Grid item xs={1} className={classes.logoGrid}>
              <img src={Logo} alt="logo" className={classes.logo} />
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item onClick={() => window.open("#/app/prep", "_self")}>
              <Tooltip title={"数据准备"} arrow placement={"bottom"}>
                <ArrowBackIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item onClick={() => window.open("#/app/view", "_self")}>
              <Tooltip title={"数据洞察"} arrow placement={"bottom"}>
                <ArrowForwardIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={"保存"} arrow placement={"bottom"}>
                <SaveIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <Tooltip title={"刷新"} arrow placement={"bottom"}>
                <RefreshIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <Tooltip title={"插入链接"} arrow placement={"bottom"}>
                <InsertLinkIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={"插入评论"} arrow placement={"bottom"}>
                <ChatBubbleOutlineIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={"函数"} arrow placement={"bottom"} onClick={handleFunctionClick}>
                <FunctionsIcon className={classes.iconTool} />
              </Tooltip>
              <Menu
                id={"function"}
                anchorEl={functionAnchorEl}
                keepMounted
                open={Boolean(functionAnchorEl)}
                onClose={handleFunctionClose}
              >
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>SUM</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item xs={1} />
                  <Grid item xs={8}>AVERAGE</Grid>
                  <Grid item xs={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item xs={1} />
                  <Grid item sm={8}>COUNT</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>MAX</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>MIN</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Divider />
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>数据库</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>数组</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>日期</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>文本</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>查找</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>统计</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>过滤器</Grid>
                  <Grid item sm={3} />
                </Grid>
                <Divider />
                <Grid container alignItems={"center"} onClick={handleFunctionClose} className={classes.menuContainer}>
                  <Grid item sm={1} />
                  <Grid item sm={8}>了解详情</Grid>
                  <Grid item sm={3} />
                </Grid>
              </Menu>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <Tooltip title={"模型"} arrow placement={"bottom"}>
                <img src={Cube} alt={"cube"} className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <Tooltip title={"分享"} arrow placement={"bottom"}>
                <ShareIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
