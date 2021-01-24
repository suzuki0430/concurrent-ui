import React, { useState, useEffect } from 'react';
import { fetchUserData, fetchChartData } from '../api/noSuspenseApi';
import { Typography } from '@material-ui/core';
import { DetailsContent } from './content/DetailsContent';
import { ChartContent } from './content/ChartContent';

export const FetchOnRender = () => {
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
      <DetailsContent
        company={userData.data.company}
        name={userData.data.name}
        image={userData.data.image}
      />
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

  return <ChartContent data={chartData} />;
};
