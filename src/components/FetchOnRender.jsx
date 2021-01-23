import React, { useState, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchUser, fetchPosts } from '../api/noSuspenseApi';

export const FetchOnRender = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then((u) => setUser(u));
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <div style={{ margin: '10px', padding: '10px' }}>
      <h2>Fetch-on-Render</h2>
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
      <ProfileChart />
    </div>
  );
};

const ProfileChart = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts().then((p) => setPosts(p));
  }, []);

  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }

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
          data={posts}
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
