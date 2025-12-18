// pages/wxAuth/wxAuth.js
import mockApi from '../../utils/mockData.js'
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sendData: '',
    openId:''
  },
  onLoad: function (options) {
    this.data.openId = options.openId
  },
  async bindGetUserInfo(e) {
    const pages = getCurrentPages()
    if (!e.detail || !e.detail.userInfo){
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    } else {
      this.data.sendData = e.detail.userInfo
      this.data.sendData.openId = this.data.openId
      // 直接使用mock数据提交用户信息
      try {
        const mockResult = await mockApi.postUserInfo(this.data.sendData);
        let tabs = [
          '/pages/home/home',
          '/pages/message/message',
          '/pages/profile/profile',
        ]
        wx.setStorageSync('token', mockResult.data.openId)
        wx.setStorageSync('userInfo', mockResult.data)
        if (pages && pages.length) {
          let _page = '/'+ pages[pages.length - 2].route
          tabs.indexOf(_page) > -1 && wx.switchTab({ url: _page })
          tabs.indexOf(_page) == -1 && wx.navigateTo({ url: _page })
        } else {
          wx.switchTab({ url: '/pages/home/home' })
        }
      } catch (error) {
        console.error('用户登录失败:', error);
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    }
  }
})