// pages/finance/report/report.js
import mockApi from '../../../utils/mockData.js'

Page({
  data: {
    balanceSheet: {},
    incomeStatement: {},
    cashFlow: {},
    activeTab: 'balance'
  },

  onLoad() {
    this.loadReports();
  },

  async loadReports() {
    try {
      const [balanceRes, incomeRes, cashFlowRes] = await Promise.all([
        mockApi.getBalanceSheet(),
        mockApi.getIncomeStatement(),
        mockApi.getCashFlow()
      ]);

      this.setData({
        balanceSheet: balanceRes.data,
        incomeStatement: incomeRes.data,
        cashFlow: cashFlowRes.data
      });
    } catch (error) {
      console.error('加载报表数据失败:', error);
    }
  },

  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    });
  },

  goBack() {
    wx.navigateBack();
  }
})
