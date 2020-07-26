/* global chrome */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, LinearProgress, Button } from '@material-ui/core';
import axios from 'axios';
import cheerio from 'cheerio';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2)
  },
  boldFont: {
    fontWeight: "bold"
  }
}));

const indexingData = {
  url: 'https://forum.pasja-informatyki.pl/tags?start=',
  tags: [],
  start: 0,
  pages: 0,
  progress: 0,
  idxButtonDisabled: false,
  idxLength: 0
}

const IndexingTags = (url, start) => {
  axios.get(url + start).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const tag = $(html).find('.qa-tag-link');
    const popularity = $(html).find('.qa-top-tags-count');

    for (let i = 0; i < tag.length; i++) {
      indexingData.tags.push({
        name: tag[i].children[0].data,
        popularity: popularity[i].children[0].data.replace(' ×', ''),
        url: tag[i].attribs.href.replace('./', 'https://forum.pasja-informatyki.pl/')
      });
    }

    if (indexingData.pages === 0) {
      const pagination = $(html).find('.qa-page-links-item');
      indexingData.pages = parseInt(pagination[pagination.length - 2].children[1].children[0].data);
    }

    indexingData.progress = indexingData.tags.length / (indexingData.pages * 30) * 100;
    indexingData.idxButtonDisabled = true;
    indexingData.idxLength = indexingData.tags.length;

    if (start <= indexingData.pages * 30) {
      start += 30;
      IndexingTags(url, start);
    } else {
      const currentdate = new Date();
      const datetime = (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate() + "/"
        + (currentdate.getMonth() < 10 ? '0' : '') + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " o "
        + (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours() + ":"
        + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes();

      chrome.storage.local.set({
        index: indexingData.tags,
        lastScan: datetime
      });

      indexingData.idxButtonDisabled = false;
      return indexingData.tags;
    }

  });
}

const IndexSettings = () => {
  const classes = useStyles();
  const [data, setData] = useState({ lastScan: "Nigdy", length: 0 });

  const runIndexing = () => IndexingTags(indexingData.url, indexingData.start);

  useEffect(() => {
    chrome.storage.local.get(['index', 'lastScan'], storage => {
      if (storage.index !== undefined) {
        setData({
          lastScan: storage.lastScan,
          length: storage.index.length
        });
      } else {
        setData({
          lastScan: "Nigdy",
          length: 0
        });
      }
    });
  });

  return (
    <Box className={classes.margin}>
      <Typography variant="h6">Opcje indeksowania</Typography>
      <Typography paragraph={true}>Ostatnie indeksowanie: <Typography variant="span" className={classes.boldFont} >{data.lastScan}</Typography>. </Typography>
      <Typography paragraph={true}>Zaindeksowano: <Typography variant="span" className={classes.boldFont} >{indexingData.idxLength || data.length}</Typography> tagów. </Typography>
      <Box>
        <Button variant="contained" color="primary" className={classes.margin} onClick={runIndexing} disabled={indexingData.idxButtonDisabled}>
          Uruchom indeksowanie tagów
        </Button>
        <LinearProgress variant="determinate" value={indexingData.progress} className={classes.margin} />
      </Box>
    </Box>
  )
}

export default IndexSettings;