import React, { useState, useEffect } from 'react';
import { fetchUserData, fetchChartData } from '../api/fakeApi';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { DetailsContent } from './content/DetailsContent';
import { ChartContent } from './content/ChartContent';

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
    <div>
      <DetailsContent
        company={userData.data.company}
        name={userData.data.name}
        image={userData.data.image}
      />
      <ProfileChart id={id} />
    </div>
  );
};

const ProfileChart = ({ id }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchChartData(id).then((p) => setChartData(p));
  }, [id]);

  if (chartData === null) {
    return (
      <Typography variant="p" component="h7">
        Loading chart...
      </Typography>
    );
  }

  return <ChartContent data={chartData} />;
};
