import React, { useState, useTransition, Suspense } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchProfileData } from '../api/tmpApi';
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const getNextId = (id) => {
  return id === 3 ? 0 : id + 1;
};

const initialResource = fetchProfileData(0);

export const ConcurrentMode = () => {
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000,
  });

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            const nextUserId = getNextId(resource.userId);
            setResource(fetchProfileData(nextUserId));
          });
        }}
      >
        次へ
      </Button>
      {isPending ? ' Loading...' : null}
      <ProfilePage resource={resource} />
    </div>
  );
};

const ProfilePage = ({ resource }) => {
  return (
    <Suspense
      fallback={
        <Typography variant="p" component="h7">
          Loading profile...
        </Typography>
      }
    >
      <ProfileDetails resource={resource} />
      <Suspense
        fallback={
          <Typography variant="p" component="h7">
            Loading chart...
          </Typography>
        }
      >
        <ProfileChart resource={resource} />
      </Suspense>
    </Suspense>
  );
};

const ProfileDetails = ({ resource }) => {
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

const ProfileChart = ({ resource }) => {
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
