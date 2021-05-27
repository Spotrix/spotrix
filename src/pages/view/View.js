import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Divider from "@material-ui/core/Divider";
import SaveIcon from '@material-ui/icons/Save';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/Link';
import CreateIcon from '@material-ui/icons/Create';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ViewListIcon from '@material-ui/icons/ViewList';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";
import PaletteIcon from '@material-ui/icons/Palette';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import CommentIcon from '@material-ui/icons/Comment';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DetailsIcon from '@material-ui/icons/Details';

import Logo from "../../images/logo.svg";
import ChartAdv from "../../images/chart-adv.svg";
import Sample0 from "../../components/Sample/Sample0";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    fontSize: 13,
    backgroundColor: "#f8f8f8",
  },
  tool: {
    height: "5vh",
    backgroundColor: "#f8f8f8",
  },
  view: {
    height: "90vh",
    backgroundColor: "#ffffff",
  },
  footer: {
    height: "5vh",
    backgroundColor: "#f8f8f8",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
  },
  logoGrid: {
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: 20,
    height: 20,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  iconTool: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    color: "#5f6368",
    paddingTop: 4,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  toolItems: {
    display: "flex",
    height: "5vh",
    alignItems: "center",
  },
  gridCard1: {
    height: "90vh",
  },
  gridCard21: {
    height: "10vh",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    "& span": {
      color: "#000000",
      fontSize: 14,
    },
    padding: theme.spacing(1),
  },
  gridCard22: {
    height: `calc(15vh - ${theme.spacing(2)}px)`,
    margin: theme.spacing(1),
    "& span": {
      color: "#000000",
      fontSize: 14,
    },
    padding: theme.spacing(1),
  },
  gridCard23: {
    height: "65vh",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    "& span": {
      color: "#000000",
      fontSize: 14,
    },
    padding: theme.spacing(1),
  },
  leftPart1: {
    height: "4vh",
    "& span": {
      color: "#000000",
      fontSize: 14,
    },
  },
  leftPart2: {
    height: "48vh",
  },
  leftPart3: {
    height: "48vh",
  },
  field1: {
    cursor: "pointer",
    marginLeft: theme.spacing(2),
    color: "#017ba8",
  },
  field2: {
    cursor: "pointer",
    marginLeft: theme.spacing(2),
    color: "#2eaf81",
  },
  fieldDivider: {
    marginBottom: theme.spacing(1),
  },
  gridCard31: {
    height: `calc(5vh - ${theme.spacing(0.5)}px)`,
    marginBottom: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
  },
  gridCard32: {
    height: `calc(5vh - ${theme.spacing(0.5)}px)`,
    marginTop: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
  },
  gridCard33: {
    height: `calc(80vh - ${theme.spacing(1)}px)`,
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  gridCard4: {
    fontSize: 13,
    color: theme.palette.text.hint,
    "& span": {
      fontSize: 13,
      color: theme.palette.text.secondary,
    },
  },
  chip1: {
    width: 100,
    height: 22,
    background: "#017ba8",
    marginLeft: theme.spacing(1),
    "& span": {
      fontSize: 13,
      fontWeight: 600,
      color: "#ffffff",
    },
  },
  chip2: {
    width: 100,
    height: 22,
    background: "#2eaf81",
    marginLeft: theme.spacing(1),
    "& span": {
      fontSize: 13,
      fontWeight: 600,
      color: "#ffffff",
    },
  },
  itemCenter: {
    display: "flex",
    justifyContent: "center",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    "& button": {
      fontSize: 13,
    }
  },
  smallIcon: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    color: "#5f6368",
  },
  chartInput: {
    borderColor: theme.palette.text.hint,
    border: "1px solid",
    borderRadius: "4px",
    width: "100%",
    "&:focus, &:hover": {
      borderColor: theme.palette.primary.main,
    },
    paddingLeft: theme.spacing(1),
    fontSize: 13,
  },
  chartFeature: {
    borderColor: theme.palette.text.hint,
    border: "1px solid",
    width: `calc(5vw - ${theme.spacing(1)}px)`,
    height: `calc(5vw - ${theme.spacing(1)}px)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 13,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  chartEmpty: {
    width: `calc(5vw - ${theme.spacing(1)}px)`,
    height: `calc(5vw - ${theme.spacing(1)}px)`,
  }
}));

export default function View() {
  const classes = useStyles();

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
            <Grid item onClick={() => window.open("#/app/cube", "_self")}>
              <Tooltip title={"数据模型"}>
                <ArrowBackIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={"自动报告"}>
                <ArrowForwardIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={"保存"}>
                <SaveIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <Tooltip title={"刷新"}>
                <AutorenewIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <Tooltip title={"添加链接"}>
                <LinkIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={"添加评论"}>
                <CreateIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <Tooltip title={"添加图表"}>
                <EqualizerIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <Tooltip title={"查看图表"}>
                <FormatListBulletedIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={"播放图表"}>
                <PlayCircleOutlineIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
            <Grid item>
              <Divider orientation={"vertical"} variant={"fullWidth"} className={classes.divider} />
            </Grid>
            <Grid item>
              <Tooltip title={"分享"}>
                <ShareIcon className={classes.iconTool} />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.view}>
          <Grid container>
            <Grid item xs={2}>
              <Card elevation={0} variant={"outlined"} square className={classes.gridCard1}>
                <Grid container className={classes.leftPart1}>
                  <Grid item xs={6}>
                    <Button fullWidth>数据</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth>分析</Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Divider className={classes.fieldDivider} />
                  </Grid>
                </Grid>
                <Grid container direction={"column"} spacing={1} className={classes.leftPart2}>
                  <Grid item className={classes.field1}># 年限(year_count)</Grid>
                  <Grid item className={classes.field1}># 省份(province)</Grid>
                  <Grid item className={classes.field1}># 类别(type)</Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Divider className={classes.fieldDivider} />
                  </Grid>
                </Grid>
                <Grid container direction={"column"} spacing={1} className={classes.leftPart3}>
                  <Grid item className={classes.field2}># 价格(price)</Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction={"column"}>
                <Grid item xs={12}>
                  <Card elevation={0} variant={"outlined"} square className={classes.gridCard21}>
                    <span>页面</span>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card elevation={0} variant={"outlined"} square className={classes.gridCard22}>
                    <span>筛选器</span>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card elevation={0} variant={"outlined"} square className={classes.gridCard23}>
                    <span>标记</span>
                    <Grid container direction={"column"} spacing={1}>
                      <Grid item xs={12}>
                        <Select
                          native
                          value={0}
                          input={<InputBase className={classes.chartInput} /> }
                        >
                          <option value={0}>折线图</option>
                          <option value={1}>柱状图</option>
                          <option value={2}>条形图</option>
                          <option value={3}>面积图</option>
                          <option value={4}>瀑布图</option>
                          <option value={5}>饼状图</option>
                        </Select>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container alignItems={"center"} justify={"space-between"}>
                          <Grid item className={classes.chartFeature}>
                            <PaletteIcon className={classes.smallIcon} />颜色
                          </Grid>
                          <Grid item className={classes.chartFeature}>
                            <AspectRatioIcon className={classes.smallIcon} />大小
                          </Grid>
                          <Grid item className={classes.chartFeature}>
                            <LocalOfferIcon className={classes.smallIcon} />标签
                          </Grid>
                          <Grid item className={classes.chartFeature}>
                            <DetailsIcon className={classes.smallIcon} />详细信息
                          </Grid>
                          <Grid item className={classes.chartFeature}>
                            <CommentIcon className={classes.smallIcon} />工具提示
                          </Grid>
                          <Grid item className={classes.chartEmpty}>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid container direction={"column"}>
                <Grid item xs={12}>
                  <Card elevation={0} variant={"outlined"} square className={classes.gridCard31}>
                    <Grid container alignItems={"center"}>
                      <Grid item xs={1} className={classes.itemCenter}>
                        <Button startIcon={<ViewColumnIcon />} className={classes.smallIcon}>列</Button>
                      </Grid>
                      <Grid item xs={11}>
                        <Chip size={"small"} label={"年限(year_count)"} className={classes.chip1} />
                        <Chip size={"small"} label={"省份(province)"} className={classes.chip1} />
                        <Chip size={"small"} label={"类别(type)"} className={classes.chip1} />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card elevation={0} variant={"outlined"} square className={classes.gridCard32}>
                    <Grid container alignItems={"center"}>
                      <Grid item xs={1} className={classes.itemCenter}>
                        <Button startIcon={<ViewListIcon />} className={classes.smallIcon}>行</Button>
                      </Grid>
                      <Grid item xs={11}>
                        <Chip size={"small"} label={"价格(price)"} className={classes.chip2} />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card elevation={0} variant={"outlined"} square className={classes.gridCard33}>
                    <Sample0 />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} className={classes.gridCard4}>
              <Grid container direction={"column"}>
                <Grid item xs={12}>
                  <Button startIcon={<img src={ChartAdv} width={16} alt="chart-adv" />}>智能显示</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          2 个数据模型，已创建 5 个图表
        </Grid>
      </Grid>
    </div>
  )
}