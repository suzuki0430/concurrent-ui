import React, { useState, useEffect } from 'react';

import '../styles.css';
// import { fetchUser, fetchPosts } from '../api/fakeApi';
import { fetchUser, fetchPosts } from '../api/tmpApi';

function getNextId(id) {
  return id === 3 ? 0 : id + 1;
}

export const NormalMode = () => {
  const [id, setId] = useState(0);
  return (
    <>
      <button onClick={() => setId(getNextId(id))}>Next</button>
      <ProfilePage id={id} />
    </>
  );
};

function ProfilePage({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then((u) => setUser(u));
  }, [id]);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <h1>{user.data.name}</h1>
      <ProfileTimeline id={id} />
    </>
  );
}

function ProfileTimeline({ id }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts(id).then((p) => setPosts(p));
  }, [id]);

  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
