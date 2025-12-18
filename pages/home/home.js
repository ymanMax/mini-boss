// pages/home/home.js
import mockApi from '../../utils/mockData.js'
Page({
  data: {
    triggered: false,
    records: [],
    userInfo: '',
    typeIndex: 0,
    sendData: {
      current: 1,
      size: 10,
      keyWords: '',
      jobTypeId: ''
    }
  },
  onLoad() {
    // this.setData({
    //   userInfo: wx.getStorageSync('userInfo')
    // })
  },
  onShow() {
    this._getJobList()
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  async _getJobList(fp = true) {
    this._freshing = true
    fp && (this.data.sendData.current = 1)
    !fp && (this.data.sendData.current ++)
    this.data.sendData.current < 1 && (this.data.sendData.current = 1)
    wx.getStorageSync('userInfo').jobofLooking && wx.getStorageSync('userInfo').jobofLooking.length && (this.data.sendData.keyWords = wx.getStorageSync('userInfo').jobofLooking[this.data.typeIndex].jobType)
    
    // 直接使用mock数据获取职位列表
    try {
      const mockResult = await mockApi.getJobList(this.data.sendData);
      if (mockResult.data.records && mockResult.data.records.length) {
        !fp && (this.data.records = this.data.records.concat(mockResult.data.records))
        fp && (this.data.records = mockResult.data.records)
        this.setData({
          records: this.data.records,
          triggered: false
        })
      } else {
        this.data.sendData.current --
        fp && (this.data.records = [])
        this.setData({
          triggered: false,
          records: this.data.records
        })
      }
    } catch (error) {
      console.error('获取职位列表失败:', error);
      this.setData({
        triggered: false
      })
    }
    this._freshing = false
  },
  changeType(event) {
    this.data.typeIndex = event.detail
    this._getJobList(true)
  },
  showSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  onPulling(e) {
    console.log('onPulling:', e)
  },
  onRefresh() {
    if (this._freshing) return
    this._getJobList()
  },
  tolower() {
    this._getJobList(false)
  },
  onRestore(e) {
    console.log('onRestore:', e)
  },
  onAbort(e) {
    console.log('onAbort', e)
  }
})