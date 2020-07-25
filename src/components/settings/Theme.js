import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  themeFormStyle: {
    margin: theme.spacing(2)
  }
}))

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

export default ThemeSettings;