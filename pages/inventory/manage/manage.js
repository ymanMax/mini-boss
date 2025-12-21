// inventory/manage/manage.js
import mockApi from '../../../utils/mockData.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inventoryList: [],
    hasLowStock: false,
    lowStockCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInventoryList();
  },

  /**
   * 加载库存列表
   */
  loadInventoryList: function() {
    wx.showLoading({ title: '加载中...' });
    mockApi.getInventoryList().then(res => {
      wx.hideLoading();
      if (res.status === 200) {
        // 检查库存预警
        const lowStockItems = res.data.filter(item => item.currentStock < item.safetyStock);
        this.setData({
          inventoryList: res.data,
          hasLowStock: lowStockItems.length > 0,
          lowStockCount: lowStockItems.length
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
      console.error('加载库存列表失败:', error);
    });
  },

  /**
   * 添加库存
   */
  addInventory: function() {
    wx.showToast({
      title: '新增库存功能开发中',
      icon: 'none'
    });
  },

  /**
   * 查看库存详情
   */
  viewInventory: function(e) {
    const inventoryId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看库存 ID: ' + inventoryId,
      icon: 'none'
    });
  },

  /**
   * 编辑库存
   */
  editInventory: function(e) {
    const inventoryId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '编辑库存 ID: ' + inventoryId,
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadInventoryList();
  }
})
