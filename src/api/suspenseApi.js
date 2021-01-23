export const fetchProfileData = (userId) => {
  let userPromise = fetchUser(userId);
  let postsPromise = fetchPosts(userId);
  return {
    userId,
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
  };
};

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
const wrapPromise = (promise) => {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
};

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
