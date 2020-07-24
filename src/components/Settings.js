import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
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
  },
  themeFormStyle: {
    margin: theme.spacing(2)
  },
  soundFormStyle: {
    margin: theme.spacing(2)
  },
  followedContainer: {
    margin: theme.spacing(2)
  },
  chipStyle: {
    margin: theme.spacing(0.5)
  },
  indexContainer: {
    margin: theme.spacing(2)
  },
  progressbarStyle: {
    margin: theme.spacing(2)
  },
  runIndexStyle: {
    margin: theme.spacing(2)
  },
  boldFont: {
    fontWeight: "bold"
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

const ThemeSettings = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('light');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset" className={classes.themeFormStyle}>
      <FormLabel component="legend">Wybierz motyw</FormLabel>
      <RadioGroup aria-label="theme" name="theme" value={value} onChange={handleChange}>
        <FormControlLabel value="light" control={<Radio color="primary" />} label="Jasny" />
        <FormControlLabel value="dark" control={<Radio color="primary" />} label="Ciemny" />
      </RadioGroup>
    </FormControl>
  );
}

const SoundSettings = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('off');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset" className={classes.soundFormStyle}>
      <FormLabel component="legend">Ustawienia dźwięku</FormLabel>
      <RadioGroup aria-label="sound" name="sound" value={value} onChange={handleChange}>
        <FormControlLabel value="off" control={<Radio color="primary" />} label="Wyciszone" />
        <FormControlLabel value="on" control={<Radio color="primary" />} label="Włączone" />
        <FormControlLabel value="onPriv" control={<Radio color="primary" />} label="Włączone (wiadomości prywatne)" />
        <FormControlLabel value="onTags" control={<Radio color="primary" />} label="Włączone (obserwowane tagi)" />
      </RadioGroup>
    </FormControl>
  );
}

const GeneralSettings = () => {
  return (
    <Box>
      <ThemeSettings />
      <SoundSettings />
    </Box>
  );
}

const FollowedList = () => {
  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Box className={classes.followedContainer}>
      <Typography variant="h6">Obserwujesz</Typography>
      <Chip className={classes.chipStyle} size="small" icon={<LoyaltyIcon />} label="html" onDelete={handleDelete} color="primary" />
      <Chip className={classes.chipStyle} size="small" icon={<LoyaltyIcon />} label="html-css" onDelete={handleDelete} color="primary" />
      <Chip className={classes.chipStyle} size="small" icon={<LoyaltyIcon />} label="javascript" onDelete={handleDelete} color="primary" />
      <Chip className={classes.chipStyle} size="small" icon={<LoyaltyIcon />} label="programowanie" onDelete={handleDelete} color="primary" />
      <Chip className={classes.chipStyle} size="small" icon={<LoyaltyIcon />} label="nauka-programowania" onDelete={handleDelete} color="primary" />
    </Box>
  );
}

const IndexSettings = () => {
  const classes = useStyles();
  const progress = 66;

  return (
    <Box className={classes.indexContainer}>
      <Typography variant="h6">Opcje indeksowania</Typography>
      <Typography paragraph={true}>Ostatnie indeksowanie: <Typography variant="span" className={classes.boldFont} >Nigdy</Typography>. </Typography>
      <Typography paragraph={true}>Zaindeksowano: <Typography variant="span" className={classes.boldFont} >0</Typography> tagów. </Typography>
      <Box>
        <Button variant="contained" color="primary" className={classes.runIndexStyle} >
          Uruchom indeksowanie tagów
        </Button>
        <LinearProgress variant="determinate" value={progress} className={classes.progressbarStyle} />
      </Box>
    </Box>
  )
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
  return (
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
  )
}

export default Settings;