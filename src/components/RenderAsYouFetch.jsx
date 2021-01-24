import React, { Suspense } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchProfileData } from '../api/suspenseApi';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

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
  const user = resource.user.read();
  return (
    <Card variant="outlined" style={{ marginTop: '10px' }}>
      <CardContent>
        <Typography style={{ fontSize: 16 }} color="textSecondary" gutterBottom>
          {user.data.company}
        </Typography>
        <Typography variant="h6" component="h2">
          {user.data.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ProfileChart = () => {
  const data = resource.posts.read();
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
