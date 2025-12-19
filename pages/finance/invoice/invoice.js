// pages/finance/invoice/invoice.js
import mockApi from '../../../utils/mockData.js'

Page({
  data: {
    invoices: []
  },

  onLoad() {
    this.loadInvoices();
  },

  async loadInvoices() {
    try {
      const res = await mockApi.getInvoices();
      this.setData({
        invoices: res.data
      });
    } catch (error) {
      console.error('加载发票数据失败:', error);
    }
  },

  viewInvoiceDetail(e) {
    const invoiceId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '发票详情',
      content: `查看发票 ${invoiceId} 的详细信息`,
      showCancel: false
    });
  },

  goBack() {
    wx.navigateBack();
  }
})
