import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  soundFormStyle: {
    margin: theme.spacing(2)
  },
}));

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

export default SoundSettings;