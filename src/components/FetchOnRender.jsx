import React, { useState, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchUser, fetchPosts } from '../api/noSuspenseApi';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

export const FetchOnRender = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then((u) => setUser(u));
  }, []);

  if (user === null) {
    return (
      <Typography variant="p" component="h7">
        Loading profile...
      </Typography>
    );
  }
  return (
    <div>
      <Card variant="outlined" style={{ marginTop: '10px' }}>
        <CardContent>
          <Typography
            style={{ fontSize: 16 }}
            color="textSecondary"
            gutterBottom
          >
            {user.data.company}
          </Typography>
          <Typography variant="h6" component="h2">
            {user.data.name}
          </Typography>
        </CardContent>
      </Card>
      <ProfileChart />
    </div>
  );
};

const ProfileChart = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts().then((p) => setPosts(p));
  }, []);

  if (posts === null) {
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
            data={posts}
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
