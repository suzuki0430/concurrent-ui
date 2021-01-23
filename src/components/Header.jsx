import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 20,
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            label="Fetch-on-Render"
            to="/"
            component={Link}
            {...a11yProps(0)}
          />
          <Tab
            label="Fetch-Then-Render"
            to="/fetch-then-render"
            component={Link}
            {...a11yProps(1)}
          />
          <Tab
            label="Render-as-You-Fetch"
            to="/render-as-you-fetch"
            component={Link}
            {...a11yProps(2)}
          />
          <Tab
            label="Contention State"
            to="/contention"
            component={Link}
            {...a11yProps(3)}
          />
          <Tab
            label="Concurrent Mode"
            to="/concurrent"
            component={Link}
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
    </div>
  );
};
