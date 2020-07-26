/* global chrome */

import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Chip, Typography, TextField, useMediaQuery, ListSubheader } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { VariableSizeList } from 'react-window';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const useStyles = makeStyles((theme) => ({
  followedContainer: {
    margin: theme.spacing(2)
  },
  chipStyle: {
    margin: theme.spacing(0.5)
  },
  searchBox: {
    margin: theme.spacing(2),
    width: 282
  },
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
}));

const LISTBOX_PADDING = 8;

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

let storageData = [];
let indexedValues = [];

chrome.storage.local.get(['index'], storage => {
  if (storage.index != undefined) {
    storage.index.map((item) => {
      storageData.push({
        name: `${item.popularity} : ${item.name}`,
        url: item.url
      });
    })
    storageData.map((item) => indexedValues.push(item.name))
  }
});

let followedItems = [];

function SearchBox() {
  const classes = useStyles();

  const handleChange = (event, value) => {
    let foundTag = storageData.find(o => o.name.split(' : ')[1] === value.split(' : ')[1]);
    const temp = [];

    chrome.storage.sync.get(['followed'], storage => {
      if (storage.followed != undefined) {
        for (let i = 0; i < storage.followed.length; i++)
          temp.push({
            name: storage.followed[i].name,
            url: storage.followed[i].url
          });
      }
      temp.push({
        name: foundTag.name.split(" : ")[1],
        url: foundTag.url
      });
      followedItems = temp;
      chrome.storage.sync.set({ followed: temp });
    })
  }

  return (
    <Autocomplete
      className={classes.searchBox}
      disableListWrap
      classes={classes}
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      options={indexedValues}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} variant="outlined" label="Szukaj tagów..." />}
      renderOption={(option) => <Typography noWrap>{option}</Typography>}
    />
  );
}

const FollowedList = () => {
  const classes = useStyles();

  const [followedList, setFollowedList] = useState(followedItems);

  const handleDelete = (name) => {
    const toRemove = name;
    chrome.storage.sync.get(['followed'], storage => {
      let followed = storage.followed;
      followed = followed.filter((object) => {
        return object.name != toRemove;
      });
      chrome.storage.sync.set({
        followed: followed
      });
      setFollowedList(followed);
    });
  };

  useEffect(() => {
    chrome.storage.sync.get(['followed'], storage => {
      setFollowedList(storage.followed);
    });
  })

  return (
    <Box className={classes.followedContainer}>
      <SearchBox />
      <Typography variant="h6">Obserwujesz</Typography>
      {
        (!followedList || followedList.length === 0) ? <Chip className={classes.chipStyle} size="small" icon={<LoyaltyIcon />} label="Brak" color="primary" /> :
          followedList.map((item) => {
            return <Chip className={classes.chipStyle} size="small" icon={<LoyaltyIcon />} label={item.name} name={item.name} onDelete={() => handleDelete(item.name)} color="primary" />
          })
      }
    </Box>
  );
}

export default FollowedList;