import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
  },
  part1: {
    height: "100vh",
    backgroundColor: theme.palette.primary.main,
  },
  part2: {
    height: "100vh",
    backgroundColor: "#ffffff",
    paddingLeft: theme.spacing(2),
  },
  part3: {
    height: "100vh",
    backgroundColor: "#f8f8f8",
    paddingLeft: theme.spacing(2),
  },
  userButton: {
    display: "flex",
    alignItems: "center",
    "& span": {
      fontSize: 13,
      fontWeight: 800,
    },
    "& button": {
      paddingTop: 1,
      paddingBottom: 1,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
    height: "15vh",
  },
  helpButton: {
    height: "15vh",
  },
  userWorkbook: {
    color: theme.palette.text.secondary,
    fontSize: 13,
    "& span": {
      fontSize: 20,
      fontWeight: 500,
      color: "#000000",
    },
    height: "60vh",
  },
  helpWorkbook: {
    color: theme.palette.text.secondary,
    fontSize: 13,
    "& span": {
      fontSize: 20,
      color: "#000000",
    },
    height: "85vh",
  },
  userDemos: {
    height: "25vh",
    "& span": {
      fontSize: 20,
      fontWeight: 500,
      color: "#000000",
    },
  },
  historyItems: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  history: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(0.5),
    "&:hover": {
      backgroundColor: "#f8f8f8",
    },
  },
  workBookName: {
    "& input": {
      fontSize: 13,
      color: "#000000",
      cursor: "pointer",
    },
  },
  demoCard: {
    height: "22vh",
    display: "flex",
    alignItems: "center",
    "& img": {
      height: "16vh",
    }
  },
  exploreCard: {
    paddingRight: theme.spacing(1),
    "& img": {
      width: "18vw",
    }
  },
  imgCard: {
    display: "flex",
    justifyContent: "center",
  },
  exploreTip: {
    color: "#000000",
  },
  helpInfo: {
    color: theme.palette.text.secondary,
    fontSize: 13,
    "& span": {
      fontSize: 16,
      color: theme.palette.text.disabled,
    },
  },
  tip: {
    fontSize: 13,
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    cursor: "pointer",
  },
  connectors: {
    fontSize: 13,
    color: "#ffffff",
    paddingLeft: theme.spacing(0.8),
    paddingRight: theme.spacing(0.8),
    paddingTop: theme.spacing(2),
  },
  connectorPart: {
    marginTop: theme.spacing(3),
  },
  connectorTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: fade("#ffffff", 0.6),
  },
  connectorItem: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  searchInput: {
    borderColor: theme.palette.text.hint,
    border: "1px solid",
    width: "100%",
    "&:focus, &:hover": {
      borderColor: "#ffffff",
    },
    paddingLeft: theme.spacing(0.5),
    fontSize: 13,
    color: "#ffffff",
    "& input": {
      paddingTop: 1,
      paddingBottom: 1,
    },
  },
  smallIcon: {
    color: "#ffffff",
    with: theme.spacing(2),
    height: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  centerIcon: {
    display: "flex",
    justifyContent: "center",
  },
  endIcon: {
    display: "flex",
    justifyContent: "flex-end",
  },
  divider: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.text.hint,
  }
}));