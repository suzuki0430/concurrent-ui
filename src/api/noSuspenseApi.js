export function fetchProfileData() {
  return Promise.all([fetchUser(), fetchPosts()]).then(([user, posts]) => {
    return { user, posts };
  });
}

export const fetchUser = () => {
  console.log('fetch user...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched user');
      resolve({
        data: {
          company: '東宝芸能',
          name: '浜辺　美波',
        },
      });
    }, 2000);
  });
};

export const fetchPosts = () => {
  console.log('fetch posts...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched posts');
      resolve([
        { date: '2/1', count: 4 },
        { date: '2/2', count: 3 },
        { date: '2/3', count: 20 },
        { date: '2/4', count: 2 },
        { date: '2/5', count: 18 },
        { date: '2/6', count: 23 },
        { date: '2/7', count: 10 },
      ]);
    }, 2000);
  });
};
