import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    height: "17vh",
    overflowY: "scroll",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 13,
  },
  bodyContainer: {
    marginTop: theme.spacing(1),
  },
  barBackground: {
    backgroundColor: "#017ba8",
    color: "#000000",
  },
  barValue: {
    color: "#017ba8",
  },
  nullHighlight: {
    color: "#da5957",
    fontWeight: 600,
  },
  otherKey: {
    color: "#000000",
  },
  otherValue: {
    color: "#017ba8",
  },
  uniqValue: {
    color: "#017ba8",
    fontSize: 24,
    fontWeight: 600,
  },
  uniqName: {
    color: theme.palette.text.secondary,
  },
  others: {
    color: theme.palette.text.secondary,
  },

}));
