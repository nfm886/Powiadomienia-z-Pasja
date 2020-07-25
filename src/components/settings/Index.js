import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  indexContainer: {
    margin: theme.spacing(2)
  },
  runIndexStyle: {
    margin: theme.spacing(2)
  },
  boldFont: {
    fontWeight: "bold"
  },
  progressbarStyle: {
    margin: theme.spacing(2)
  }
}));

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

export default IndexSettings;