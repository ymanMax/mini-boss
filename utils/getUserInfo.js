import mockApi from './mockData.js'

const app = getApp()

export default {
  getUserInfo: () => {
    return new Promise(async (resolve, reject) =>{
      try {
        // 直接使用mock数据获取用户信息
        const mockResult = await mockApi.getUser();
        app.globalData.userInfo = mockResult.data
        resolve(mockResult.data)
      } catch (error) {
        console.error('获取用户信息失败:', error);
        reject(error)
      }
    })
  }
}