import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    height: "65vh",
    fontSize: 12,
  },
  close: {
    textAlign: "right",
  },
  functionReferrer: {
    paddingLeft: theme.spacing(2),
  },
  grid1: {
    backgroundColor: "#f8f8f8",
    fontWeight: 600,
    height: "5vh",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grid2: {
    height: "5vh",
    fontSize: 10,
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grid3: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grid31: {
    height: "50vh",
  },
  grid310: {
    border: "1px solid #e0e0e0",
    padding: "0 4px",
    fontSize: 12,
    color: "#000000",
    height: "3vh",
    marginBottom: theme.spacing(1),
  },
  grid311: {
    border: "1px solid #e0e0e0",
    padding: "0 4px",
    fontSize: 10,
    color: "#000000",
    height: "3vh",
    marginBottom: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  grid312: {
    height: `calc(47vh - ${theme.spacing(1)}px)`,
    maxHeight: `calc(47vh - ${theme.spacing(1)}px)`,
    overflowY: "scroll",
    color: "#000000",
    fontSize: 10,
    "& span": {
      padding: "2px 4px",
    },
  },
  grid32: {
    height: "50vh",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grid321: {
    border: "1px solid #e0e0e0",
    padding: "0 4px",
    fontSize: 10,
    color: "#000000",
    height: "3vh",
    marginBottom: theme.spacing(1)
  },
  grid322: {
    height: `calc(47vh - ${theme.spacing(1)}px)`,
    maxHeight: `calc(47vh - ${theme.spacing(1)}px)`,
    overflowY: "scroll",
    color: "#000000",
    fontSize: 10,
    "& span": {
      padding: "2px 4px",
    },
  },
  grid33: {
    height: "50vh",
  },
  grid4: {
    height: "5vh",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    "& span": {
      fontSize: 10,
      fontWeight: 800,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    }
  },
  functionHover: {
    "&:hover": {
      backgroundColor: fade(theme.palette.text.hint, 0.4),
    },
  },
  functionName: {
    fontWeight: 600,
    color: "#000000",
  },
  functionDesc: {
    fontSize: 10,
    color: "#000000",
  },
  functionDemo: {
    marginTop: theme.spacing(3),
    fontSize: 10,
    color: "#000000",
  },
  editArea: {
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    fontSize: 12,
  },
  typeImg: {
    marginLeft: 5,
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
  }
}));
