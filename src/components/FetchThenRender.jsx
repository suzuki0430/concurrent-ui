import React, { useState, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchProfileData } from '../api/noSuspenseApi';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

// Kick off fetching as early as possible
const promise = fetchProfileData();

export const FetchThenRender = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    promise.then((data) => {
      setUser(data.user);
      setPosts(data.posts);
    });
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
      <ProfileChart posts={posts} />
    </div>
  );
};

const ProfileChart = ({ posts }) => {
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
