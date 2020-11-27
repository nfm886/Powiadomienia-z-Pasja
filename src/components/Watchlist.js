/* global chrome */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { html_unescape, parseWhen, parseTime } from '../helpers/functions';
import { Box, Paper, CircularProgress, makeStyles, Container, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

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

const followList = [];
const watchList = [];
const lastQuestions = [];

chrome.storage.sync.get(['followed'], storage => {
  if (storage.followed !== undefined && storage.followed.length > 0) {
    for (let i = 0; i < storage.followed.length; i++) {
      followList.push({
        name: storage.followed[i].name,
        url: storage.followed[i].url
      });
    }
  }
});

const GettingPosts = (object, iteration) => new Promise((resolve, reject) => {
  if (iteration >= 0) {
    axios.get(object[iteration].url).then((response) => {

      const html = response.data;
      const $ = cheerio.load(html);

      const title = $(html).find('div.qa-q-item-main > div.qa-q-item-title > a > span');
      const when = $(html).find('div.qa-q-item-main > span > span > span.qa-q-item-when > span.qa-q-item-when-data');
      const urls = $(html).find('div.qa-q-item-main > div.qa-q-item-title > a');

      lastQuestions.push({
        tag: object[iteration].name,
        title: title[0].children[0].data.trunc(65).toString(),
        url: urls[0].attribs.href.replace('../', 'https://forum.pasja-informatyki.pl/')
      });

      title.map((key, item) => {
        return watchList.push({
          title: html_unescape(title[key].children[0].data).trunc(65).toString(),
          when: parseWhen(when[key].children[0].data),
          date: parseTime(when[key].children[0].data),
          tag: object[iteration].name,
          url: urls[key].attribs.href.replace('../', 'https://forum.pasja-informatyki.pl/')
        });
      });

      iteration = iteration - 1;
      resolve(GettingPosts(object, iteration));
    });
  } else {
    resolve(watchList);
  }
})

const Watchlist = () => {

  const classes = useStyles();

  const [data, setData] = useState(null);

  useEffect(() => {
    GettingPosts(followList, followList.length - 1).then((data) => {
      chrome.storage.local.set({ lastQuestions: lastQuestions });
      (data.length === 0) ? setData('empty') : setData(data.sort((a, b) => b.date - a.date))
    });
  }, []);

  const handleClick = (url) => {
    window.open(url);
  }

  if(data === 'empty') {
    return (
      <Paper className={classes.info} elevation={0}>
          <h1>Pusto.</h1>
      </Paper>
    )
  } else {
    return (
      <Container className={classes.root}>
          {
          (data === null) ? 
            <Box className={classes.progress}>
              <CircularProgress color="primary" />
            </Box> :
              <Paper elevation={0}>
                <List className={classes.root}>
                {data.map((item, index) => {
                  return (
                      <ListItem onClick={ () => handleClick(item.url) } className={classes.listItem}>
                        <ListItemAvatar>
                          <Avatar>
                            <h3>#</h3>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.title} secondary={item.when + " w " + item.tag} />
                      </ListItem>
                  )
                })}
                </List>
              </Paper>
          }
      </Container>
    )
  }
}

export default Watchlist;