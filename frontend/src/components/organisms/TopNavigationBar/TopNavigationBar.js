import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(() => ({
  appBar: {
    height: "64px",
    width: "100%",
  },
}));
const TopNavigationBar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="default">
      <Toolbar>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography variant="h3" style={{ flex: 1 }}>
                  WindStream Change Management
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Avatar
                  src="https://www.avinashtripathi.in/wp-content/uploads/2019/09/portrait-square-06-300x300.jpg"
                  style={{
                    height: "36px",
                    width: "36px",
                    marginLeft: "10px",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigationBar;
