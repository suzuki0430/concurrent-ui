import React, { useState, useEffect } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import '../styles.css';
import { fetchUser, fetchPosts } from '../api/tmpApi';

const getNextId = (id) => {
  return id === 3 ? 0 : id + 1;
};

export const ContentionState = () => {
  const [id, setId] = useState(0);
  return (
    <div style={{ margin: '10px', padding: '10px' }}>
      <h2>Contention State(競合状態)</h2>
      <button onClick={() => setId(getNextId(id))}>次へ</button>
      <ProfilePage id={id} />
    </div>
  );
};

const ProfilePage = ({ id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then((u) => setUser(u));
  }, [id]);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
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
      <ProfileChart id={id} />
    </>
  );
};

const ProfileChart = ({ id }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts(id).then((p) => setPosts(p));
    console.log(posts);
  }, [id]);

  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }

  return (
    <>
      <h3>街で声をかけられた回数</h3>
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
