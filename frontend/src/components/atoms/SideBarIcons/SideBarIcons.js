import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  }
});

const SideBarIcons = (props) => {
  const classes = useStyles;
  return <div className={classes.root}>{props.icon}</div>;
};

export default SideBarIcons;
