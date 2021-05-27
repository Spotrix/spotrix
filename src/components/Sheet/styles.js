import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100vw",
    height: "90vh",
    backgroundColor: "#ffffff",
    fontSize: 13,
  },
  // flow-part
  gridCard10: {
    height: "35vh",
    marginBottom: theme.spacing(1),
    backgroundColor: "#ffffff",
  },
  // tiny-nav-part
  gridCard11: {
    height: "5vh",
    backgroundColor: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  // data-summary-cart-part
  gridCard12: {
    height: `calc(30vh - ${theme.spacing(2)}px)`,
    marginBottom: theme.spacing(1),
    backgroundColor: "#f8f8f8",
  },
  // MonacoEditor-component-part
  gridCard120: {
    height: `calc(55vh - ${theme.spacing(3)}px)`,
    marginBottom: theme.spacing(1),
    backgroundColor: "#ffffff",
  },
  // sheet-data-part
  gridCard13: {
    height: "20vh",
  },
  gridCard2: {
    fontSize: 13,
    paddingTop: theme.spacing(3),
  },
  gridData: {
    color: "#000000",
    "&:focus": {
      outline: "none",
    },
  },
  gridDataSearch: {
    backgroundColor: "#ffffff",
    fontSize: 10,
    paddingLeft: 4,
    paddingRight: 4,
  },
  cell: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 .5em",
    borderRight: "1px dashed #e0e0e0",
    borderBottom: "1px dashed #e0e0e0",
    whiteSpace: "nowrap",
    overflow: "auto",
    "&:hover": {
      borderWidth: "2px",
      borderStyle: "dashed",
      borderColor: theme.palette.primary.light,
    },
    cursor: "crosshair",
  },
  dataSummary: {
    display: "flex",
    overflowX: "scroll",
    cursor: "pointer",
  },
  dataSummaryCard: {
    height: `calc(30vh - ${theme.spacing(4)}px)`,
    width: theme.spacing(35),
    minWidth: theme.spacing(35),
    margin: theme.spacing(1),
  },
  dataSummaryCardX: {
    height: `calc(55vh - ${theme.spacing(4)}px)`,
    width: theme.spacing(35),
    minWidth: theme.spacing(35),
    margin: theme.spacing(1),
  },
  columnName: {
    margin: theme.spacing(0.5),
    fontWeight: 600,
    fontSize: 13,
    padding: 0.5,
    color: "#000000",
  },
  columnCount: {
    margin: theme.spacing(0.5),
    fontSize: 13,
    padding: 0.5,
    color: theme.palette.text.secondary,
  },
  smallTool: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: "#5f6368",
  },
  dataCubes: {
    fontSize: 13,
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
    "&:hover": {
      fontWeight: 600,
      backgroundColor: "#f8f8f8",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
  cubeName: {
    wordBreak: "keep-all",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cubeImg: {
    width: 12,
    height: 12,
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  buttonText: {
    fontSize: 13,
    "& span": {
      textTransform: 'none',
    },
  },
  gridItem: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  smallImg: {
    width: 15,
    height: 15,
    padding: 2.5,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: fade(theme.palette.text.hint, 0.5),
    },
  },
  typeImg: {
    marginLeft: 5,
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  menuContainer: {
    "& li": {
      fontSize: 13,
      color: theme.palette.text.primary,
    },
  },
  tinyIcon: {
    width: 16,
    height: 16,
  },
  dividerGap: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

}));

