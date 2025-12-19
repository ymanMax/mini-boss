// pages/finance/accounting/accounting.js
import mockApi from '../../../utils/mockData.js'

Page({
  data: {
    records: [],
    accounts: [],
    showAddModal: false,
    newRecord: {
      type: 'income',
      category: '',
      amount: '',
      description: '',
      account: ''
    }
  },

  onLoad() {
    this.loadAccountingData();
  },

  async loadAccountingData() {
    try {
      const [recordsRes, accountsRes] = await Promise.all([
        mockApi.getAccountingRecords(),
        mockApi.getAccounts()
      ]);

      this.setData({
        records: recordsRes.data,
        accounts: accountsRes.data
      });
    } catch (error) {
      console.error('加载财务数据失败:', error);
    }
  },

  showAddForm() {
    this.setData({
      showAddModal: true
    });
  },

  hideAddForm() {
    this.setData({
      showAddModal: false,
      newRecord: {
        type: 'income',
        category: '',
        amount: '',
        description: '',
        account: ''
      }
    });
  },

  handleInputChange(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;

    this.setData({
      [`newRecord.${field}`]: value
    });
  },

  async addRecord() {
    try {
      await mockApi.addAccountingRecord(this.data.newRecord);
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      });

      this.hideAddForm();
      this.loadAccountingData();
    } catch (error) {
      console.error('添加记账记录失败:', error);
      wx.showToast({
        title: '添加失败',
        icon: 'error'
      });
    }
  },

  goToVoucher() {
    wx.navigateTo({
      url: '/pages/finance/voucher/voucher'
    });
  },

  goToReport() {
    wx.navigateTo({
      url: '/pages/finance/report/report'
    });
  },

  goToBudget() {
    wx.navigateTo({
      url: '/pages/finance/budget/budget'
    });
  },

  goToInvoice() {
    wx.navigateTo({
      url: '/pages/finance/invoice/invoice'
    });
  },

  goToAnalysis() {
    wx.navigateTo({
      url: '/pages/finance/analysis/analysis'
    });
  }
})
