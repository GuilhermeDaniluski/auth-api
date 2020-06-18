import React from "react";

import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import colors from "Styles/colors";


const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: colors.primary,
  },
  barColorPrimary: {
    backgroundColor: colors.primaryDark,
  },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

export default function LinearLoader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorLinearProgress className={classes.margin} />
    </div>
  );
}
