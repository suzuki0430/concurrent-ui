import React, { useState, useEffect } from 'react';
import { fetchProfileData } from '../api/noSuspenseApi';
import { Typography } from '@material-ui/core';
import { DetailsContent } from './content/DetailsContent';
import { ChartContent } from './content/ChartContent';

// Kick off fetching as early as possible
const promise = fetchProfileData();

export const FetchThenRender = () => {
  const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    promise.then((data) => {
      setUserData(data.userData);
      setChartData(data.chartData);
    });
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
      <ProfileChart chartData={chartData} />
    </div>
  );
};

const ProfileChart = ({ chartData }) => {
  if (chartData === null) {
    return (
      <Typography variant="p" component="h7">
        Loading chart...
      </Typography>
    );
  }

  return <ChartContent data={chartData} />;
};
