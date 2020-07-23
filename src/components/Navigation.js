import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles({
  root: {
    width: 282,
    backgroundColor: "#0984e3"
  },
  navLink: {
    color: "#ffffff",
    '&$selected': {
      color: "#ffffff"
    },
  },
  selected: {}
});

const Navigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Ustawienia"
        icon={<SettingsIcon />}
        component={Link}
        to="/settings"
        classes={{
          root: classes.navLink,
          selected: classes.selected
        }}
      />
      <BottomNavigationAction
        label="Obserwowane"
        icon={<LoyaltyIcon />}
        component={Link}
        to="/watchlist"
        classes={{
          root: classes.navLink,
          selected: classes.selected
        }}
      />
      <BottomNavigationAction
        label="Powiadomienia"
        icon={<NotificationsIcon />}
        component={Link}
        to="/"
        classes={{
          root: classes.navLink,
          selected: classes.selected
        }}
      />
    </BottomNavigation>
  );
}

export default Navigation;