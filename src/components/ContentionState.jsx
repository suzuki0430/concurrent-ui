import React, { useState, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchUser, fetchPosts } from '../api/tmpApi';
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const getNextId = (id) => {
  return id === 3 ? 0 : id + 1;
};

export const ContentionState = () => {
  const [id, setId] = useState(0);
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setId(getNextId(id))}
      >
        次へ
      </Button>
      <ProfilePage id={id} />
    </div>
  );
};

const ProfilePage = ({ id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then((u) => setUser(u));
  }, [id]);

  if (user === null) {
    return (
      <Typography variant="p" component="h7" style={{ marginLeft: 10 }}>
        Loading profile...
      </Typography>
    );
  }
  return (
    <>
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
      <ProfileChart id={id} />
    </>
  );
};

const ProfileChart = ({ id }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts(id).then((p) => setPosts(p));
    console.log(posts);
  }, [id]);

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
