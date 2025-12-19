// pages/finance/analysis/analysis.js
import mockApi from '../../../utils/mockData.js'

Page({
  data: {
    monthlyTrend: [],
    expenseCategories: []
  },

  onLoad() {
    this.loadAnalysisData();
  },

  async loadAnalysisData() {
    try {
      const analysisRes = await mockApi.getFinancialAnalysis();
      this.setData({
        monthlyTrend: analysisRes.data.monthlyTrend,
        expenseCategories: analysisRes.data.expenseCategories
      });
    } catch (error) {
      console.error('加载分析数据失败:', error);
    }
  },

  goBack() {
    wx.navigateBack();
  }
})
