import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const useStyles = makeStyles((theme) => ({
  followedContainer: {
    margin: theme.spacing(2)
  },
  chipStyle: {
    margin: theme.spacing(0.5)
  }
}));

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

export default FollowedList;