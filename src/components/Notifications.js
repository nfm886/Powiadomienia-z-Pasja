/* global chrome */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, Box, Container, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import EmailIcon from '@material-ui/icons/Email';
import SmsIcon from '@material-ui/icons/Sms';
import StarsIcon from '@material-ui/icons/Stars';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Email } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "467px",
    width: "360px",
    padding: "0px",
    paddingTop: "28px",
    overflowY: "scroll"
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  info: {
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

const renderAction = action => {
  switch(action) {
    case "U":
      return <ThumbUpIcon />
    case "D":
      return <ThumbDownIcon />
    case "K":
      return <ChatBubbleIcon />
    case "N":
      return <StarsIcon />
    case "W":
      return <EmailIcon />
    case "O":
      return <SmsIcon />
    default:
      return <FiberManualRecordIcon /> 
  }
}

const Notifications = () => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    axios.post('https://forum.pasja-informatyki.pl/eventnotify', form).then(
      (response) => {

        if(response.data !== "Userid is empty!") {
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
        } else {
          setNotifications(response.data)
        }
        console.log(nfyWhat)
      }
    )
  }, []);

  const handleClick = (url) => {
    window.open(url)
  }

  if(notifications === 'Userid is empty!') {
    return (
      <Paper className={classes.info} elevation={0}>
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
                            {/* <h3>{item.action.slice(0,1)}</h3> */}
                            {/* <ThumbUpIcon /> */}
                            {
                              renderAction(item.action.slice(0,1))
                            }
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