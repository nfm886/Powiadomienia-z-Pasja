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
    width: "360px",
    backgroundColor: "#1769aa",
    borderBottom: "2px solid #2196f3",
    boxShadow: "0 -5px 15px 5px rgba(0,0,0,0.5)",
    position: "fixed",
    zIndex: 999
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
        to="/settings/watchlist"
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