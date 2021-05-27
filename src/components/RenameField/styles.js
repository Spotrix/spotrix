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
    width: "16vw",
    height: `calc(55vh - ${theme.spacing(1)}px)`,
    border: "1px solid #e0e0e0",
    marginRight: theme.spacing(1),
    backgroundColor: "#f8f8f8",
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  part3: {
    width: `calc(84vw - ${theme.spacing(1)}px)`,
    height: `calc(55vh - ${theme.spacing(1)}px)`,
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    fontSize: 12,
    color: "#000000",
  },
  fieldMeta: {
    cursor: "pointer",
    marginBottom: theme.spacing(1),
    "&:hover": {
      fontWeight: 600,
      backgroundColor: "#ffffff",
    }
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
  partTable: {
    display: "flex",
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  headerCell: {
    fontWeight: 600,
  },
  bodyCell: {
    fontWeight: 400,
    wordBreak: "keep-all",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  typeItem: {
    marginLeft: 5,
    fontSize: 10,
    "& span": {
      marginLeft: theme.spacing(0.5),
      textTransform: "capitalize",
    },
    display: "flex",
    alignItems: "center",
    color: "#017ba8",
  }
}));

