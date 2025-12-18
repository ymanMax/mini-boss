// pages/search/search.js
import mockApi from '../../utils/mockData.js'
Page({
  data: {
    records:[],
    searchHistoryList: [],
    triggered: false,
    showInput: true,
    showDel: false,
    sendData: {
      current: 1,
      size: 10,
      keyWords: '',
      jobTypeId: ''
    }
  },
  onLoad: function (options) {
    this._getSearchHistory()
  },
  async _getSearchHistory() {
    // 直接使用mock数据获取搜索历史
    try {
      const mockResult = await mockApi.getSearchHistory({});
      this.setData({
        searchHistoryList: mockResult.data || []
      })
    } catch (error) {
      console.error('获取搜索历史失败:', error);
      this.setData({
        searchHistoryList: []
      })
    }
  },
  textInput(event) {
    console.log(event)
    if (event.detail.value && event.detail.value !== '') {
      this.setData({
        showDel: true
      })
    }
  },
  clearInput() {
    this.data.sendData.keyWords = ''
    this.setData({
      sendData: this.data.sendData,
      showDel: false
    })
  },
  focusInput() {
    !this.data.showInput && this._getSearchHistory()
    this.data.sendData.keyWords && (this.data.showDel = true)
    this.setData({
      showDel: this.data.showDel,
      showInput: true,
      records: []
    })
  },
  confirmInput(event) {
    this.data.sendData.keyWords = event.detail.value
    this.setData({
      sendData: this.data.sendData,
      showInput: false
    })
    this._getJobList()
    this.addHistory(event.detail.value)
  },
  chooseHistoryItem(event) {
    this.data.sendData.keyWords = event.currentTarget.dataset.item
    this.setData({
      sendData: this.data.sendData,
      showInput: false
    })
    this._getJobList()
  },
  async _getJobList(fp = true) {
    this._freshing = true
    fp && (this.data.sendData.current = 1)
    !fp && (this.data.sendData.current ++)
    this.data.sendData.current < 1 && (this.data.sendData.current = 1)
    
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
        this.setData({
          triggered: false
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
  addHistory(jobType) {
    // 直接使用mock数据添加搜索历史
    mockApi.addSearchHistory({ jobType: jobType });
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