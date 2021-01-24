import React, { useState, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchUserData, fetchChartData } from '../api/noSuspenseApi';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: '14px',
  },
}));

export const FetchOnRender = () => {
  const classes = useStyles();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData().then((u) => setUserData(u));
  }, []);

  if (userData === null) {
    return (
      <Typography variant="p" component="h7">
        Loading profile...
      </Typography>
    );
  }
  return (
    <div>
      <Card variant="outlined" style={{ marginTop: '10px' }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item>
            <CardContent>
              <Typography
                style={{ fontSize: 16 }}
                color="textSecondary"
                gutterBottom
              >
                {userData.data.company}
              </Typography>
              <Typography variant="h6" component="h2">
                {userData.data.name}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item>
            <Avatar
              alt="minami"
              src={userData.data.image}
              className={classes.large}
            />
          </Grid>
        </Grid>
      </Card>
      <ProfileChart />
    </div>
  );
};

const ProfileChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchChartData().then((p) => setChartData(p));
  }, []);

  if (chartData === null) {
    return (
      <Typography variant="p" component="h7">
        Loading chart...
      </Typography>
    );
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <Typography variant="h6" component="h2">
        サインを求められた回数
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <LineChart
            width={400}
            height={400}
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <Line dataKey="count" stroke="salmon" />
            <XAxis dataKey="date" />
            <YAxis />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};
