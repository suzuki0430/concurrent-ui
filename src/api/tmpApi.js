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

export const fetchUser = (userId) => {
  console.log('fetch user ' + userId + '...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched user ' + userId);
      switch (userId) {
        case 0:
          resolve({
            data: {
              company: '東宝芸能',
              name: '浜辺　美波',
            },
          });
          break;
        case 1:
          resolve({
            data: {
              company: 'フォスタープラス',
              name: '広瀬　すず',
            },
          });
          break;
        case 2:
          resolve({
            data: {
              company: 'ディスカバリー・ネクスト',
              name: '橋本　環奈',
            },
          });
          break;
        case 3:
          resolve({
            data: {
              company: 'SASUKE軍団',
              name: '山田　勝己',
            },
          });
          break;
        default:
          throw Error('Unknown user.');
      }
    }, 2000 * Math.random());
  });
};

export const fetchPosts = (userId) => {
  console.log('fetch posts for ' + userId + '...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched posts for ' + userId);
      switch (userId) {
        case 0:
          resolve([
            { date: '2/1', count: 4 },
            { date: '2/2', count: 3 },
            { date: '2/3', count: 20 },
            { date: '2/4', count: 2 },
            { date: '2/5', count: 18 },
            { date: '2/6', count: 23 },
            { date: '2/7', count: 10 },
          ]);
          break;
        case 1:
          resolve([
            { date: '2/1', count: 10 },
            { date: '2/2', count: 1 },
            { date: '2/3', count: 2 },
            { date: '2/4', count: 2 },
            { date: '2/5', count: 13 },
            { date: '2/6', count: 3 },
            { date: '2/7', count: 10 },
          ]);
          break;
        case 2:
          resolve([
            { date: '2/1', count: 0 },
            { date: '2/2', count: 30 },
            { date: '2/3', count: 2 },
            { date: '2/4', count: 11 },
            { date: '2/5', count: 18 },
            { date: '2/6', count: 2 },
            { date: '2/7', count: 40 },
          ]);
          break;
        case 3:
          resolve([
            { date: '2/1', count: 100 },
            { date: '2/2', count: 1000 },
            { date: '2/3', count: 200 },
            { date: '2/4', count: 2000 },
            { date: '2/5', count: 1000 },
            { date: '2/6', count: 2000 },
            { date: '2/7', count: 5000 },
          ]);
          break;
        default:
          throw Error('Unknown user.');
      }
    }, 2000 * Math.random());
  });
};
