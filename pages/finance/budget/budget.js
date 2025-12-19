// pages/finance/budget/budget.js
import mockApi from '../../../utils/mockData.js'

Page({
  data: {
    budgetPlans: []
  },

  onLoad() {
    this.loadBudgetPlans();
  },

  async loadBudgetPlans() {
    try {
      const res = await mockApi.getBudgetPlans();
      this.setData({
        budgetPlans: res.data
      });
    } catch (error) {
      console.error('加载预算数据失败:', error);
    }
  },

  viewBudgetDetail(e) {
    const planId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '预算详情',
      content: `查看预算计划 ${planId} 的详细信息`,
      showCancel: false
    });
  },

  goBack() {
    wx.navigateBack();
  }
})
