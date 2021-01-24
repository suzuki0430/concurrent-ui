import React, { Suspense } from 'react';
import { fetchProfileData } from '../api/suspenseApi';
import { Typography } from '@material-ui/core';
import { DetailsContent } from './content/DetailsContent';
import { ChartContent } from './content/ChartContent';

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
  const userData = resource.userData.read();
  return (
    <DetailsContent
      company={userData.data.company}
      name={userData.data.name}
      image={userData.data.image}
    />
  );
};

const ProfileChart = () => {
  const data = resource.chartData.read();
  return <ChartContent data={data} />;
};
