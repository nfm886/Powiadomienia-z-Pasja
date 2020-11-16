/* global chrome */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import "../index.css";
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}));

chrome.browserAction.setBadgeText({text: ''})

const FormData = require('form-data');
const form = new FormData();
form.append('ajax', 'receiveNotify');

const Notifications = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    axios.post('https://forum.pasja-informatyki.pl/eventnotify', form).then(
      (response) => {
        const data = response.data;
        const a_tag = /<a (.*)>/g;
        setNotifications(data.replace(a_tag, '<a target="_blank" $1>'));
      }
    )
  });

  if(notifications === 'Userid is empty!') {
    return (
      <Paper style={{height: '467px'}}>
        <div className={classes.root}>
          <h3>Nie jesteś zalogowany.</h3>
        </div>
      </Paper>
    )
  } else {
    return (
      <Paper style={{height: '467px'}}>
        <div className={classes.root}>
          {
            (notifications === null) ? <CircularProgress color="primary" /> : <div dangerouslySetInnerHTML={{ __html: notifications }} class="notifications" />
          }
        </div>
      </Paper>
    );
  }
}

export default Notifications;