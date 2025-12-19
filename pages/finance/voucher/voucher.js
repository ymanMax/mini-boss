// pages/finance/voucher/voucher.js
import mockApi from '../../../utils/mockData.js'

Page({
  data: {
    vouchers: []
  },

  onLoad() {
    this.loadVouchers();
  },

  async loadVouchers() {
    try {
      const res = await mockApi.getVouchers();
      this.setData({
        vouchers: res.data
      });
    } catch (error) {
      console.error('加载凭证数据失败:', error);
    }
  },

  viewVoucherDetail(e) {
    const voucherId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '凭证详情',
      content: `查看凭证 ${voucherId} 的详细信息`,
      showCancel: false
    });
  },

  goBack() {
    wx.navigateBack();
  }
})
