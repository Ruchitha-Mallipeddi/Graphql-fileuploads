import React from "react";
import Grid from "@material-ui/core/Grid";
import SideBarIcons from "../../atoms/SideBarIcons/SideBarIcons";
import IconButton from "@material-ui/core/IconButton";
import { Typography, makeStyles } from "@material-ui/core";
import SdStorageIcon from "@material-ui/icons/SdStorage";
const useStyles = makeStyles({
  root: {
    width: "76px",
    height: "44px",
    borderRadius: 0,
    maxHeight: "44px",
  },
  selected: {
    width: "76px",
    height: "44px",
    borderLeft: "2px solid #38888b",
    backgroundColor: "#f6f6f6",
    borderRadius: 0,
    maxHeight: "44px",
  },
  second: {
    width: "76px",
    height: "44px",
    borderLeft: "2px solid #38888b",
    borderRadius: 0,
    maxHeight: "44px",
  },
});

const SideNavigationBar = (props) => {
  const classes = useStyles();
  return (
    <div style={{ height: "792px", width: "76px" }}>
      <Grid container justify="space-around">
        <Grid item>
          <Grid container justify="space-between" style={{ marginBottom: "125px" }}>
            <Grid item>
              <Typography variant="h2" style={{ margin: "12px 0 10px 20px" }}>
                W
              </Typography>
            </Grid>
            <Grid item className={classes.root}>
              <IconButton className={classes.root} onClick={(e) => props.handleTabChange(e, "FileStorage")}>
                <SideBarIcons icon={<SdStorageIcon />} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideNavigationBar;
