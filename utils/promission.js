import mockApi from './mockData.js'

const authPromission = () => {
  const token = wx.getStorageSync('token')
  const userInfo = wx.getStorageSync('userInfo')
  
  // 直接使用mock用户数据
  if (!userInfo) {
    // 模拟用户登录成功，设置mock用户数据
    const mockUserData = mockApi.getUser({});
    
    if (mockUserData && mockUserData.data) {
      wx.setStorageSync('userInfo', mockUserData.data);
      wx.setStorageSync('token', 'mock_token_' + Date.now());
      
      // 设置全局用户信息
      const app = getApp();
      if (app && app.globalData) {
        app.globalData.userInfo = mockUserData.data;
      }
    }
  }
  
  // 如果已经有用户信息，直接使用
  console.log('用户授权完成，使用mock数据');
}

export default authPromission