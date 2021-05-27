import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Divider from "@material-ui/core/Divider";

import DemoImg from "../../images/demo.png";
import ExploreImg from "../../images/explore.png";
import useStyles from "./styles";
import { LoadFile } from "../../components/LoadFile";
import db from "../../utils/_db";
import { WorkbookContext } from "../../context/UserContext";

const Connectors = [
  {
    title: "到云端",
    items: [
      "Tabletrix Server",
    ]
  },
  {
    title: "到文件",
    items: [
      "Microsoft Excel",
      "文本文件",
      "JSON 文件",
      "CSV 文件",
      "Tabletrix 数据提取",
    ]
  },
  {
    title: "到服务器",
    items: [
      "MySQL",
      "Oracle",
      "Presto",
      "Salesforce",
      "MariaDB",
      "Databricks",
      "Spark SQL",
      "MongoDB",
      "PostgreSQL",
      "Impala",
      "Microsoft SQL Server",
      "Apache Drill",
      "Cloudera Hadoop",
    ]
  },
];

export default function Prep() {
  const classes = useStyles();

  const { workbookMeta, setWorkbookMeta } = useContext(WorkbookContext);

  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSetDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleSetDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSetDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleSetDialogClose = () => {
    setDialogOpen(false);
  };

  const handleUpdateWorkbookMeta = (value) => {
    db.set("workbookContext.bookName", value).write();
    // update workbook context sheets focus
    db.set("workbookContext.sheets", []).write();
    fetch("http://localhost:8080/workbook/getSheets", {
      method: "post",
      headers:{
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({db: value}),
    }).then(s => s.json())
      .then(d => {
        db.set("workbookContext.sheets", d).write();
        let temp = { ...workbookMeta };
        temp.bookName = value;
        temp.sheets = d;
        setWorkbookMeta(temp);
      })
      .catch(r => console.error(r));

    console.log(db.get("workbookContext").value());
  };

  useEffect(() => {
    fetch("http://localhost:8080/workbook/recent", {
      method: "post",
      headers:{
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({}),
    }).then(s => s.json())
      .then(d => {
        setData(d);
      })
      .catch(r => console.error(r));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item style={{width: drawerOpen ? "13vw" : "3vw"}} className={classes.part1}>
          <Grid container direction={"column"}>
            {drawerOpen ?
              <Grid item xs={12} className={classes.endIcon}>
                <ArrowBackIosIcon
                  className={classes.smallIcon}
                  onClick={handleSetDrawerClose}
                />
              </Grid>
              :
              <Grid item xs={12} className={classes.centerIcon}>
                <ArrowForwardIosIcon
                  className={classes.smallIcon}
                  onClick={handleSetDrawerOpen}
                />
              </Grid>
            }
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            {/* connectors */}
            <div hidden={!drawerOpen}>
              <Grid container direction={"column"} className={classes.connectors}>
              <Grid item xs={12}>
                <InputBase fullWidth={true} startAdornment={<SearchIcon fontSize={"small"} />} className={classes.searchInput} />
              </Grid>
              {Connectors.map(it => (
                <Grid container direction={"column"} key={it.title} className={classes.connectorPart}>
                  <Grid item xs={12} className={classes.connectorTitle}>
                    {it.title}
                  </Grid>
                  {it.items.map(tt => (
                    <Grid item xs={12} key={tt} className={classes.connectorItem}>
                      {tt}
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
            </div>
          </Grid>
        </Grid>
        {/* user history */}
        <Grid item style={{width: drawerOpen ? "70vw" : "80vw"}} className={classes.part2}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.userButton}>
              <Button
                variant={"outlined"}
                onClick={handleSetDialogOpen}
              >打开工作簿</Button>
              <Button
                variant={"contained"}
                disableElevation
                color={"primary"}
                onClick={handleSetDrawerOpen}
              >
                连接到数据
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.userWorkbook}>
              <span>最近的工作簿</span>
              <Grid container className={classes.historyItems}>
                <Grid item xs={3}>标题</Grid>
                <Grid item xs={4}>上次打开</Grid>
                <Grid item xs={4}>位置</Grid>
                <Grid item xs={1}>模型</Grid>
                {data.map(it => (
                  <Grid container className={classes.history} key={it.name} alignItems={"center"}>
                    <Grid item xs={3} className={classes.workBookName} onClick={() => {
                      handleUpdateWorkbookMeta(it.name);
                      window.open("#/app/cube", "_self");
                    }}>
                      <InputBase fullWidth disabled value={it.name} />
                    </Grid>
                    <Grid item xs={4}>{it.lastModified}</Grid>
                    <Grid item xs={4}>{it.path}</Grid>
                    <Grid item xs={1}>{it.models}</Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.userDemos}>
              <span>示例流程</span>
              <Grid container spacing={3} className={classes.demoCard}>
                <Grid item>
                  <Card elevation={0}>
                    <img src={DemoImg} alt="demo"/>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* user guide */}
        <Grid item style={{width: "17vw"}} className={classes.part3}>
          <Grid container>
            <Grid item xs={12} className={classes.helpButton}>
            </Grid>
            <Grid item xs={12} className={classes.helpWorkbook}>
              <span>探索</span>
              <Grid container className={classes.history}>
                <Grid item xs={12} className={classes.exploreCard}>
                  <Card elevation={1} className={classes.imgCard}>
                    <img src={ExploreImg} alt="explore"/>
                  </Card>
                  <p className={classes.exploreTip}>浏览 Tabletrix</p>
                  <Grid container className={classes.helpInfo}>
                    <Grid item xs={12}>
                      <Button size={"small"} startIcon={<PlayCircleOutlineIcon />}>培训</Button>
                    </Grid>
                    <Grid item xs={12} className={classes.tip}>
                      入门教程
                    </Grid>
                    <Grid item xs={12} className={classes.tip}>
                      可视化词典
                    </Grid>
                    <Grid item xs={12} className={classes.tip}>
                      视频：Tabletrix 界面介绍
                    </Grid>
                    <Grid item xs={12} className={classes.tip}>
                      视频：开始使用 Tabletrix 进行数据探索
                    </Grid>
                  </Grid>
                  <Grid container className={classes.helpInfo}>
                    <Grid item xs={12}>
                      <Button size={"small"} startIcon={<FolderOpenIcon />}>资源</Button>
                    </Grid>
                    <Grid item xs={12} className={classes.tip}>
                      博客 - 了解此产品中的新增功能
                    </Grid>
                    <Grid item xs={12} className={classes.tip}>
                      博客 - 掌握 Tabletrix 学习资源
                    </Grid>
                    <Grid item xs={12} className={classes.tip}>
                      论坛
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <LoadFile
        dialogOpen={dialogOpen}
        handleSetDialogOpen={handleSetDialogOpen}
        handleSetDialogClose={handleSetDialogClose}
      />
    </div>
  );
}