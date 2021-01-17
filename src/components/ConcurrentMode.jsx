import React, { useState, useTransition, Suspense } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';

import '../styles.css';
import { fetchProfileData } from '../api/fakeApi';

function getNextId(id) {
  return id === 3 ? 0 : id + 1;
}

const initialResource = fetchProfileData(0);

export const ConcurrentMode = () => {
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000,
  });

  const data = [
    { date: '2/1', count: 4 },
    { date: '2/2', count: 3 },
    { date: '2/3', count: 20 },
    { date: '2/4', count: 2 },
    { date: '2/5', count: 18 },
    { date: '2/6', count: 23 },
    { date: '2/7', count: 10 },
  ];

  return (
    <>
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            const nextUserId = getNextId(resource.userId);
            setResource(fetchProfileData(nextUserId));
          });
        }}
      >
        Next
      </button>
      {isPending ? ' Loading...' : null}
      <ProfilePage resource={resource} />
      <ProfileChart data={data} />
    </>
  );
};

const ProfilePage = ({ resource }) => {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
};

const ProfileDetails = ({ resource }) => {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
};

const ProfileTimeline = ({ resource }) => {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
};

const ProfileChart = ({ data }) => {
  return (
    <LineChart
      width={400}
      height={400}
      data={data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <Line type="monotone" dataKey="count" stroke="#387908" />
      <XAxis dataKey="date" />
      <YAxis />
    </LineChart>
  );
};
