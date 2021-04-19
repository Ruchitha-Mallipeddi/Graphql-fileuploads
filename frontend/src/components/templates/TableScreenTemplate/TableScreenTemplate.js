import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignContent: "flex-start",
  },
  right: {
    width: `calc(100% - 76px)`,
    flexDirection: "column",
  },
  left: {
    width: "76px",
  },
}));

export default function TableScreenTemplate(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.left}>
        <Grid>{props.sidebar}</Grid>
      </Grid>
      <Grid container justify="flex-start" className={classes.right}>
        <Grid item>{props.header}</Grid>
        <Grid item>{props.body}</Grid>
      </Grid>
    </Grid>
  );
}
