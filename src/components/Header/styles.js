import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100vw",
    fontSize: 12,
  },
  tool: {
    height: "5vh",
    backgroundColor: "#f8f8f8",
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
  toolItems: {
    display: "flex",
    height: "5vh",
    alignItems: "center",
  },
  colorReset: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  cubeSvnIcon: {
    marginTop: 4,
  },
  smallGap: {
    marginBottom: 1,
    cursor: "pointer",
  },
  iconTool: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    color: "#5f6368",
    paddingTop: 4,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  menuContainer: {
    fontSize: 12,
    width: 200,
    padding: theme.spacing(0.5),
    cursor: "pointer",
    "&:hover": {
      fontWeight: 600,
      color: "#000000",
    },
  },
}));
