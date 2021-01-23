import React, { useState, useTransition, Suspense } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchProfileData } from '../api/tmpApi';

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
    <div style={{ margin: '10px', padding: '10px' }}>
      <h2>Concurrent Mode(並列モード)</h2>
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            const nextUserId = getNextId(resource.userId);
            setResource(fetchProfileData(nextUserId));
          });
        }}
      >
        次へ
      </button>
      {isPending ? ' Loading...' : null}
      <ProfilePage resource={resource} />
    </div>
  );
};

const ProfilePage = ({ resource }) => {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileChart resource={resource} />
      </Suspense>
    </Suspense>
  );
};

const ProfileDetails = ({ resource }) => {
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

const ProfileChart = ({ resource }) => {
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
