// logistics/tracking/tracking.js
import mockApi from '../../../utils/mockData.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    logisticsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadLogisticsList();
  },

  /**
   * 加载物流列表
   */
  loadLogisticsList: function() {
    wx.showLoading({ title: '加载中...' });
    mockApi.getLogisticsList().then(res => {
      wx.hideLoading();
      if (res.status === 200) {
        this.setData({
          logisticsList: res.data
        });
      } else {
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        });
      }
    }).catch(error => {
      wx.hideLoading();
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
      console.error('加载物流列表失败:', error);
    });
  },

  /**
   * 查看物流轨迹
   */
  viewTracking: function(e) {
    const logisticsId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看物流轨迹 ID: ' + logisticsId,
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadLogisticsList();
  }
})
