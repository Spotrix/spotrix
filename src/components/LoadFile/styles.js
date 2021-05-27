import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    height: "65vh",
    fontSize: 13,
  },
  close: {
    textAlign: "right",
  },
  grid1: {
    backgroundColor: "#f8f8f8",
    fontWeight: 600,
    height: "5vh",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grid2: {
    height: "55vh",
    maxHeight: "55vh",
    overflowY: "scroll",
    fontSize: 13,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grid3: {
    height: "5vh",
    fontSize: 13,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  smallIcon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  bookName: {
    color: "#000000",
  },
  evenLine: {
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: "#f8f8f8",
  },
  oddLine: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  fieldWrap: {
    wordBreak: "keep-all",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  menuTitle: {
    backgroundColor: "#f8f8f8",
    fontWeight: 600,
    fontSize: 14,
  },
}));
