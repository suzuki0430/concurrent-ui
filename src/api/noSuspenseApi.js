import minami from '../picture/minami.jpg';

export const fetchProfileData = () => {
  return Promise.all([fetchUserData(), fetchChartData()]).then(
    ([userData, chartData]) => {
      return { userData, chartData };
    }
  );
};

export const fetchUserData = () => {
  console.log('fetch userData...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched userData');
      resolve({
        data: {
          company: '東宝芸能',
          name: '浜辺　美波',
          image: minami,
        },
      });
    }, 2000);
  });
};

export const fetchChartData = () => {
  console.log('fetch chartData...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetched chartData');
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
