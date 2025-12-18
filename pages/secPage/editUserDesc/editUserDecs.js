// pages/secPage/editUserDesc/editUserDecs.js
import mockApi from '../../../utils/mockData.js'
Page({
  data: {
    lengthNow: 0,
    userInfo: '',
    isIphone: false
  },
  onLoad: function (options) {
    let system = getApp().globalData.systemInfo
    if (system.model.indexOf('iPhone X') > -1 || system.model.indexOf('iPhone 11') > -1) {
      this.setData({
        isIphone: true,
      })
    }
  },
  onShow: function () {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  textInput(event) {
    this.data.userInfo.discribe = event.detail.value
    this.setData({
      lengthNow: event.detail.value.length
    })
  },
  async commit() {
    // 直接使用mock数据提交用户信息
    try {
      const mockResult = await mockApi.postUserInfo(this.data.userInfo);
      wx.setStorageSync('userInfo', mockResult.data)
      getApp().globalData.userInfo = mockResult.data
      wx.showToast({
        title: '提交成功',
      })
      wx.navigateBack({
        delta: 1
      })
    } catch (error) {
      console.error('提交用户信息失败:', error);
      wx.showToast({
        title: '提交失败',
        icon: 'none'
      })
    }
  }
})