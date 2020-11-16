/* global chrome */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import { html_unescape, parseWhen, parseTime } from '../helpers/functions';
import { Box, Paper, CircularProgress, makeStyles } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const useStyles = makeStyles((theme) => ({
  center: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  nfyWhat: {
    marginLeft: "42px !important",
    position: "relative",
    width: "100%"
  },
  tagIcon: {
    position: "absolute",
    top: "4px",
    left: "-36px"
  },
  nfyTime: {
    margin: "8px !important",
    marginLeft: "42px !important"
  },
  showTag: {
    margin: '0 6px',
    padding: '2px 6px',
    borderRadius: '5px',
    fontSize: 10
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

  if(data === 'empty') {
    return (
      <Paper style={{height: '467px'}}>
        <Box className={classes.center}>
          <h1>Pusto.</h1>
        </Box>
      </Paper>
    )
  } else {
    return (
      <Paper style={{height: '467px'}}>
        <Box id='#nfyContainerInbox'>
          {
            (data === null) ?
              <Box className={classes.center}>
                <CircularProgress color="primary" />
              </Box> :
              data.map((item) => {
                return (
                  <Box class="itemBox">
                    <Box class="nfyItemLine">
                      <p className={classes.nfyWhat}>
                        <span className={classes.tagIcon}><LoyaltyIcon /></span><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                      </p>
                      <p className={classes.nfyTime}>{item.when} w <span className={classes.showTag}>{item.tag}</span></p>
                    </Box>
                  </Box>
                )
              })
          }
        </Box>
      </Paper>
    )
  }
}

export default Watchlist;