// pages/secPage/jobTypesList/jobTypesList.js
import mockApi from '../../../utils/mockData.js'
Page({
  data: {
    userInfo: '',
    postStatus: [
      {
        value: '离职-随时到岗',
        key: '0'
      },
      {
        value: '在职-暂不考虑',
        key: '1S'
      },
      {
        value: '在职-月内到岗',
        key: '2'
      }
    ],
  },
  onLoad: function (options) {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
  },
  onShow: function () {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
  },
  toExpectPage(event) {
    let params = event.currentTarget.dataset
    console.log('params: ', params)
    wx.navigateTo({ url: `/pages/secPage/expectPage/expectPage?expectItem=${JSON.stringify(params.expectitem)}&index=${params.index}` })
  },
  async chooseJonStatus(event) {
    this.data.userInfo.userPostStatus = event.detail.value
    // 直接使用mock数据提交用户信息
    try {
      const mockResult = await mockApi.postUserInfo(this.data.userInfo);
      wx.setStorageSync('userInfo', mockResult.data)
      getApp().globalData.userInfo = mockResult.data
      this.setData({
        userInfo: this.data.userInfo
      })
    } catch (error) {
      console.error('更新用户状态失败:', error);
    }
  }
})