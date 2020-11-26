/* global chrome */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Box, Container, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "467px",
    width: "360px",
    padding: "0px",
    paddingTop: "28px"
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  listItem: {
    borderBottom: "3px dotted #dfe6e9",
    "&:hover": {
      backgroundColor: "#dfe6e9",
      cursor: "pointer"
    }
  }
}));

chrome.browserAction.setBadgeText({text: ''});

const nfyWhat = [];

const FormData = require('form-data');
const form = new FormData();
form.append('ajax', 'receiveNotify');

const Notifications = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    axios.post('https://forum.pasja-informatyki.pl/eventnotify', form).then(
      (response) => {

        const html = response.data
        const $ = cheerio.load(html);

        const nfyWhatClass = $(html).find('.nfyWhat');
        
        let i;
        
        for(i = 0; i < nfyWhatClass.length; i++) {
          nfyWhat.push({
            action: nfyWhatClass[i].children[0].data.trim(),
            title: nfyWhatClass[i].parent.children[1].children[1].children[0].data.trim(),
            url: nfyWhatClass[i].children[1].attribs.href,
            when: nfyWhatClass[i].parent.children[4].prev.children[0].data.trim()
          })
        }

        setNotifications(nfyWhat);
      }
    )
  }, []);

  const handleClick = (url) => {
    window.open(url)
  }

  if(notifications === 'Userid is empty!') {
    return (
      <Paper className={classes.root}>
          <h3>Nie jesteś zalogowany.</h3>
      </Paper>
    )
  } else {
    return (
      <Container className={classes.root}>
          {
          (notifications === null) ? 
            <Box className={classes.progress}>
              <CircularProgress color="primary" />
            </Box> :
              <Paper elevation={0}>
                <List className={classes.root}>
                {notifications.map((item, index) => {
                  return (
                      <ListItem onClick={ () => handleClick(item.url) } className={classes.listItem}>
                        <ListItemAvatar>
                          <Avatar>
                            <h3>{item.action.slice(0,1)}</h3>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.title} secondary={item.when} />
                      </ListItem>
                  )
                })}
                </List>
              </Paper>
          }
      </Container>
    );
  }
}

export default Notifications;