import React, { useState, useTransition, Suspense } from 'react';
import { fetchProfileData } from '../api/fakeApi';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { DetailsContent } from './content/DetailsContent';
import { ChartContent } from './content/ChartContent';

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
        <Typography variant="p" component="h7" style={{ marginLeft: 10 }}>
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
  const userData = resource.userData.read();
  return (
    <DetailsContent
      company={userData.data.company}
      name={userData.data.name}
      image={userData.data.image}
    />
  );
};

const ProfileChart = ({ resource }) => {
  const data = resource.chartData.read();
  return <ChartContent data={data} />;
};
