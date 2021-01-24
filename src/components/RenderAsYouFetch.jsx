import React, { Suspense } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchProfileData } from '../api/suspenseApi';
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

const resource = fetchProfileData();

export const RenderAsYouFetch = () => {
  return <ProfilePage />;
};

const ProfilePage = () => {
  return (
    <Suspense
      fallback={
        <Typography variant="p" component="h7">
          Loading profile...
        </Typography>
      }
    >
      <ProfileDetails />
      <Suspense
        fallback={
          <Typography variant="p" component="h7">
            Loading chart...
          </Typography>
        }
      >
        <ProfileChart />
      </Suspense>
    </Suspense>
  );
};

const ProfileDetails = () => {
  const classes = useStyles();
  const userData = resource.userData.read();
  return (
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
  );
};

const ProfileChart = () => {
  const data = resource.chartData.read();
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
            data={data}
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
