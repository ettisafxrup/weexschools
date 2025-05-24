// Host the backend server and include the server path at back:{ server: "server link" }
// as an example, localhost link is included here. check for backend repo:
// Github: github.com/ettisafxrup/weex_back

const env = {
  appName: 'weexSchools',
  slogan: 'Manage Like a Pro!🖤😲',
  back: {
    server: 'http://127.0.0.1:5500/',
  },
  storageKeys: [
    'institution',
    'joinDate',
    'studentsList',
    'studentStatus',
    'noticesList',
  ],
};

export default env;
