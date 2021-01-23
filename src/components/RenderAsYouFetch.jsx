import React, { Suspense } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchProfileData } from '../api/suspenseApi';

const resource = fetchProfileData();

export const RenderAsYouFetch = () => {
  return (
    <div style={{ margin: '10px', padding: '10px' }}>
      <h2>Render-as-You-Fetch</h2>
      <ProfilePage />
    </div>
  );
};

const ProfilePage = () => {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileChart />
      </Suspense>
    </Suspense>
  );
};

const ProfileDetails = () => {
  const user = resource.user.read();
  return (
    <div
      style={{
        border: 'solid 1px',
        borderRadius: '5px',
        marginTop: '10px',
        padding: '10px',
        width: '500px',
      }}
    >
      <h3>{user.data.company}</h3>
      <h2>{user.data.name}</h2>
    </div>
  );
};

const ProfileChart = () => {
  const data = resource.posts.read();
  return (
    <>
      <h3>サインを求められた回数</h3>
      <div
        style={{
          border: 'solid 1px',
          borderRadius: '5px',
          padding: '10px',
          width: '500px',
        }}
      >
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
      </div>
    </>
  );
};
