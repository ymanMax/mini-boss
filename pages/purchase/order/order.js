// purchase/order/order.js
import mockApi from '../../../utils/mockData.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    filteredOrders: [],
    currentFilter: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOrderList();
  },

  /**
   * 加载订单列表
   */
  loadOrderList: function() {
    wx.showLoading({ title: '加载中...' });
    mockApi.getPurchaseOrderList().then(res => {
      wx.hideLoading();
      if (res.status === 200) {
        this.setData({
          orderList: res.data,
          filteredOrders: res.data
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
      console.error('加载订单列表失败:', error);
    });
  },

  /**
   * 筛选订单
   */
  filterOrders: function(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      currentFilter: status
    });

    if (status === '') {
      this.setData({
        filteredOrders: this.data.orderList
      });
    } else {
      const filtered = this.data.orderList.filter(order => order.status === status);
      this.setData({
        filteredOrders: filtered
      });
    }
  },

  /**
   * 添加订单
   */
  addOrder: function() {
    wx.showToast({
      title: '新增订单功能开发中',
      icon: 'none'
    });
  },

  /**
   * 查看订单详情
   */
  viewOrder: function(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看订单: ' + orderId,
      icon: 'none'
    });
  },

  /**
   * 批准订单
   */
  approveOrder: function(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认批准',
      content: '确定要批准该订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '处理中...' });
          mockApi.approvePurchaseOrder({
            orderId: orderId,
            approver: '张经理'
          }).then(response => {
            wx.hideLoading();
            if (response.success) {
              wx.showToast({
                title: '批准成功',
                icon: 'success'
              });
              this.loadOrderList();
            }
          }).catch(error => {
            wx.hideLoading();
            wx.showToast({
              title: '批准失败',
              icon: 'none'
            });
          });
        }
      }
    });
  },

  /**
   * 拒绝订单
   */
  rejectOrder: function(e) {
    const orderId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认拒绝',
      content: '确定要拒绝该订单吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '处理中...' });
          mockApi.rejectPurchaseOrder({
            orderId: orderId,
            reason: '不符合采购要求'
          }).then(response => {
            wx.hideLoading();
            if (response.success) {
              wx.showToast({
                title: '拒绝成功',
                icon: 'success'
              });
              this.loadOrderList();
            }
          }).catch(error => {
            wx.hideLoading();
            wx.showToast({
              title: '拒绝失败',
              icon: 'none'
            });
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadOrderList();
  }
})
