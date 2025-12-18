import mockApi from './mockData.js'

// 将API路径映射到mock函数
const apiPathToMock = {
  '/mini-api/user/get-openid': 'authApi',
  '/mini-api/user/get-info': 'getUser',
  '/mini-api/user/post-user': 'postUserInfo',
  '/mini-api/common/file-upload': 'uploadFile',
  '/mini-api/common/address-by-coordinate': 'coordinate2Address',
  '/mini-api/job/get-job-list': 'getJobList',
  '/mini-api/job/get-job-types': 'getJobTypes',
  '/mini-api/job/get-jobInfo': 'getJobDetail',
  '/mini-api/user/history-search': 'getSearchHistory',
  '/mini-api/user/history-search-add': 'addSearchHistory',
  '/mini-api/company/add-company': 'addCompany',
  '/mini-api/job/add-job': 'addJob'
};

const request = (url, data, method) => {
  // 直接使用mock数据，不再进行网络请求
  console.log(`直接使用mock数据: ${url}`, data);
  
  if (apiPathToMock[url] && mockApi[apiPathToMock[url]]) {
    return mockApi[apiPathToMock[url]](data);
  }
  
  // 如果没有对应的mock函数，返回默认成功响应
  return Promise.resolve({
    status: 200,
    message: 'success',
    data: {}
  });
}

export default request