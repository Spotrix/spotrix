import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  sheetIcon: {
    width: theme.spacing(2),
  },
  smallIcon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    "&:hover": {
      cursor: "pointer",
    },
  },
  aggregationIcon: {
    padding: 4,
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  sheetJoin: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  imgIcon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  menuContainer: {
    "& li": {
      fontSize: 13,
      color: theme.palette.text.primary,
    },
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));