import React, { useState, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchUserData, fetchChartData } from '../api/tmpApi';
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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData(id).then((u) => setUserData(u));
  }, [id]);

  if (userData === null) {
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
            {userData.data.company}
          </Typography>
          <Typography variant="h6" component="h2">
            {userData.data.name}
          </Typography>
        </CardContent>
      </Card>
      <ProfileChart id={id} />
    </>
  );
};

const ProfileChart = ({ id }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchChartData(id).then((p) => setChartData(p));
    console.log(chartData);
  }, [id]);

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
