import React, { useState, useEffect } from 'react';
import '../styles.css';
import { fetchProfileData } from '../fetchThenRenderApi';

// Kick off fetching as early as possible
const promise = fetchProfileData();

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    promise.then((data) => {
      setUser(data.user);
      setPosts(data.posts);
    });
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline posts={posts} />
    </>
  );
};

// The child doesn't trigger fetching anymore
const ProfileTimeline = ({ posts }) => {
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
};
