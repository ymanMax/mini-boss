// analytics/supplychain/supplychain.js
import mockApi from '../../../utils/mockData.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    analyticsData: {
      supplierPerformance: [],
      inventoryTurnover: [],
      orderFulfillment: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadAnalyticsData();
  },

  /**
   * 加载分析数据
   */
  loadAnalyticsData: function() {
    wx.showLoading({ title: '加载数据中...' });
    mockApi.getSupplyChainAnalytics().then(res => {
      wx.hideLoading();
      if (res.status === 200) {
        this.setData({
          analyticsData: res.data
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
      console.error('加载分析数据失败:', error);
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadAnalyticsData();
  }
})
