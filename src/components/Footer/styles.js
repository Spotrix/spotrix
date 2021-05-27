import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "5vh",
    display: "flex",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f8f8f8",
  },
  iconTool: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    paddingTop: 4,
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  menuItemName: {
    fontSize: 12,
  },
  menuItemActiveName: {
    fontSize: 12,
    fontWeight: 600,
    color: theme.palette.primary.light,
  },
  footerGrid: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
    paddingLeft: theme.spacing(1),
  },
  gridItem: {
    paddingLeft: theme.spacing(2),
  },
}));