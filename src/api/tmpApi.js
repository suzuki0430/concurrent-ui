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
              university: 'オックスフォード大学',
              department: '医学部',
              departure: '看護学科',
              name: '浜辺　美波',
            },
          });
          break;
        case 1:
          resolve({
            data: {
              university: 'ハーバード大学',
              department: '工学部',
              departure: '物理学科',
              name: '広瀬　すず',
            },
          });
          break;
        case 2:
          resolve({
            data: {
              university: 'ケンブリッジ大学',
              department: '経済学部',
              departure: '経済学科',
              name: '橋本　環奈',
            },
          });
          break;
        case 3:
          resolve({
            data: {
              university: 'SASUKE大学',
              department: 'SASUKE部',
              departure: 'SASUKE学科',
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
            {
              id: 0,
              text: 'I get by with a little help from my friends',
            },
            {
              id: 1,
              text: "I'd like to be under the sea in an octupus's garden",
            },
            {
              id: 2,
              text: 'You got that sand all over your feet',
            },
          ]);
          break;
        case 1:
          resolve([
            {
              id: 0,
              text: 'Turn off your mind, relax, and float downstream',
            },
            {
              id: 1,
              text: 'All things must pass',
            },
            {
              id: 2,
              text: "I look at the world and I notice it's turning",
            },
          ]);
          break;
        case 2:
          resolve([
            {
              id: 0,
              text: 'Living is easy with eyes closed',
            },
            {
              id: 1,
              text: "Nothing's gonna change my world",
            },
            {
              id: 2,
              text: 'I am the walrus',
            },
          ]);
          break;
        case 3:
          resolve([
            {
              id: 0,
              text: 'Woke up, fell out of bed',
            },
            {
              id: 1,
              text: 'Here, there, and everywhere',
            },
            {
              id: 2,
              text: 'Two of us sending postcards, writing letters',
            },
          ]);
          break;
        default:
          throw Error('Unknown user.');
      }
    }, 2000 * Math.random());
  });
};
