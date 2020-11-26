import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ThemeSettings from './Theme';
import SoundSettings from './Sound';
import IndexSettings from './Index';
import FollowedList from './Followed';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "467px",
    paddingTop: "58px"
  },
  breadcrumbContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#4dabf5"
  },
  link: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
  },
  breadCrumbStyle: {
    backgroundColor: "#4dabf5",
    color: "#ffffff"
  },
  breadCrumbLink: {
    color: "#ffffff",
    textDecoration: "none"
  }
}));

const IconBreadcrumbs = () => {
  const classes = useStyles();

  return (
    <Box className={classes.breadcrumbContainer}>
      <Breadcrumbs separator={<MoreVertIcon />} aria-label="breadcrumb" className={classes.breadCrumbStyle}>
        <Link to="/settings/general" className={classes.breadCrumbLink}>
          Generalne
      </Link>
        <Link to="/settings/watchlist" className={classes.breadCrumbLink}>
          Obserwowane
      </Link>
      </Breadcrumbs>
    </Box>
  );
}

const GeneralSettings = () => {
return (
  <Box>
    <Paper>
      <ThemeSettings />
      <SoundSettings />
    </Paper>
  </Box>
  );
}

const WatchlistSettings = () => {
  return (
    <Box>
      <FollowedList />
      <IndexSettings />
    </Box>
  )
}

const Settings = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <Router>
        <IconBreadcrumbs />
        <Switch>
          <Route path="/settings/general">
            <GeneralSettings />
          </Route>
          <Route path="/settings/watchlist">
            <WatchlistSettings />
          </Route>
        </Switch>
      </Router>
    </Paper>
  )
}

export default Settings;