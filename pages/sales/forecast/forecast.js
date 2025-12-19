Page({
  /**
   * 页面的初始数据
   */
  data: {
    forecastPeriod: 'quarter', // 'month' | 'quarter' | 'year'
    forecastData: {
      monthly: [
        { month: '1月', actual: 120000, forecast: 150000, probability: 85 },
        { month: '2月', actual: 145000, forecast: 180000, probability: 78 },
        { month: '3月', actual: 0, forecast: 220000, probability: 65 },
        { month: '4月', actual: 0, forecast: 200000, probability: 55 },
        { month: '5月', actual: 0, forecast: 190000, probability: 45 },
        { month: '6月', actual: 0, forecast: 210000, probability: 35 }
      ],
      quarterly: [
        { quarter: 'Q1', actual: 265000, forecast: 220000, probability: 72 },
        { quarter: 'Q2', actual: 0, forecast: 600000, probability: 68 },
        { quarter: 'Q3', actual: 0, forecast: 750000, probability: 62 },
        { quarter: 'Q4', actual: 0, forecast: 900000, probability: 58 }
      ],
      yearly: [
        { year: '2025', actual: 265000, forecast: 2470000, probability: 65 },
        { year: '2026', actual: 0, forecast: 3200000, probability: 52 }
      ]
    },
    salesSummary: {
      totalOpportunities: 28,
      avgWinRate: 68,
      avgSalesCycle: 45,
      forecastRevenue: 2470000,
      actualRevenue: 265000
    },
    showExportModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 默认加载季度数据
    this.loadForecastData('quarter');
  },

  /**
   * 加载预测数据
   */
  loadForecastData: function(period) {
    this.setData({
      forecastPeriod: period
    });
  },

  /**
   * 切换预测周期
   */
  changeForecastPeriod: function(e) {
    const period = e.currentTarget.dataset.period;
    this.loadForecastData(period);
  },

  /**
   * 导出预测报告
   */
  exportForecastReport: function() {
    this.setData({
      showExportModal: true
    });
  },

  /**
   * 关闭导出弹窗
   */
  closeExportModal: function() {
    this.setData({
      showExportModal: false
    });
  },

  /**
   * 确认导出
   */
  confirmExport: function() {
    // 模拟导出功能
    wx.showToast({
      title: '报告导出成功',
      icon: 'success'
    });

    this.closeExportModal();
  },

  /**
   * 查看详细预测分析
   */
  viewDetailedAnalysis: function() {
    wx.showToast({
      title: '详细分析功能开发中',
      icon: 'none'
    });
  }
});