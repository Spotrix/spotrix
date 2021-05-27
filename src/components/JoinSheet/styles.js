import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100vw",
    height: "60vh",
    fontSize: 12,
    backgroundColor: "#ffffff",
  },
  close: {
    textAlign: "right",
  },
  title: {
    fontWeight: 600,
  },
  linearProcess: {
    backgroundColor: theme.palette.warning.main,
  },
  part1: {
    width: "100vw",
    height: "5vh",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: "1px solid #e0e0e0",
  },
  part2: {
    width: "28vw",
    height: `calc(55vh - ${theme.spacing(1)}px)`,
    marginRight: theme.spacing(1),
  },
  part21: {
    width: "28vw",
    height: `calc(25vh - ${theme.spacing(2)}px)`,
    maxHeight: `calc(25vh - ${theme.spacing(2)}px)`,
    overflowY: "scroll",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f8f8f8",
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  part22: {
    fontSize: 10,
    color: theme.palette.text.secondary,
    width: "28vw",
    height: `calc(15vh - ${theme.spacing(1)}px)`,
    maxHeight: `calc(15vh - ${theme.spacing(1)}px)`,
    overflowY: "scroll",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f8f8f8",
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    "& span": {
      color: theme.palette.text.primary,
      fontSize: 12,
      marginBottom: theme.spacing(1),
    },
    marginBottom: theme.spacing(1),
  },
  part23: {
    width: "28vw",
    height: "15vh",
    maxHeight: "15vh",
    overflowY: "scroll",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f8f8f8",
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  part3: {
    width: `calc(72vw - ${theme.spacing(1)}px)`,
    height: `calc(55vh - ${theme.spacing(1)}px)`,
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    padding: "0 4px",
    fontSize: 10,
    color: "#000000",
  },
  smallTool: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: "#5f6368",
  },
  gridDataSearch: {
    backgroundColor: "#ffffff",
    fontSize: 10,
    paddingLeft: 4,
    paddingRight: 4,
  },
  adviseImg: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  adviseTip: {
    fontSize: 10,
  },
  typeImg: {
    width: 10,
    height: 10,
  },
  fieldMeta: {
    cursor: "pointer",
  },
  leftField: {
    textAlign: "right",
    color: "#000000",
    fontSize: 12,
    borderBottom: "2px solid #41C3F1",
  },
  midField: {
    textAlign: "center",
  },
  rightField: {
    textAlign: "left",
    color: "#000000",
    fontSize: 12,
    borderBottom: "2px solid #F6C253",
  },
  leftTableName: {
    textAlign: "right",
  },
  midTableJoin: {
    display: "flex",
    justifyContent: "center",
    "& img": {
      height: "5vh",
    },
  },
  rightTableName: {
    textAlign: "left",
  }
}));

