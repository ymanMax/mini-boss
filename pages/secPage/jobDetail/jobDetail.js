// pages/secPage/jobDetail/jobDetail.js
import mockApi from '../../../utils/mockData.js'
Page({
  data: {
    expand: false,
    isCollected: false,
    isIphone: false,
    jobId: '',
    jobDetail: ''
  },
  onLoad: function (options) {
    this._getDetail(options.jobId)
    let system = getApp().globalData.systemInfo
    if (system.model.indexOf('iPhone X') > -1 || system.model.indexOf('iPhone 11') > -1) {
      this.setData({
        isIphone: true
      })
    }
  },
  async _getDetail(jobId) {
    // 直接使用mock数据获取职位详情
    try {
      const mockResult = await mockApi.getJobDetail({ jobId: jobId });
      this.setData({
        jobDetail: mockResult.data
      })
    } catch (error) {
      console.error('获取职位详情失败:', error);
    }
  },
  showAllText() {
    this.setData({
      expand: !this.data.expand
    })
  },
  showMap() {
    wx.navigateTo({ url: `/pages/secPage/map/map?latitude=${this.data.jobDetail.exactAddress.lat}&longitude=${this.data.jobDetail.exactAddress.lng}&name=${this.data.jobDetail.companyId.companyName}` })
  },
  shareTap() {
    wx.chooseContact()
  },
  collectTap() {
    this.setData({
      isCollected: !this.data.isCollected
    })
  }
})