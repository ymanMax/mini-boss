// supplier/manage.js
import mockApi from '../../../utils/mockData.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    supplierList: [],
    searchKeyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadSupplierList();
  },

  /**
   * 加载供应商列表
   */
  loadSupplierList: function() {
    wx.showLoading({ title: '加载中...' });
    mockApi.getSupplierList().then(res => {
      wx.hideLoading();
      if (res.status === 200) {
        this.setData({
          supplierList: res.data
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
      console.error('加载供应商列表失败:', error);
    });
  },

  /**
   * 搜索输入处理
   */
  onSearchInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  /**
   * 搜索供应商
   */
  searchSupplier: function() {
    const keyword = this.data.searchKeyword;
    if (!keyword) {
      this.loadSupplierList();
      return;
    }

    wx.showLoading({ title: '搜索中...' });
    mockApi.getSupplierList().then(res => {
      wx.hideLoading();
      if (res.status === 200) {
        const filteredList = res.data.filter(supplier =>
          supplier.supplierName.includes(keyword) ||
          supplier.contactPerson.includes(keyword)
        );
        this.setData({
          supplierList: filteredList
        });
      }
    }).catch(error => {
      wx.hideLoading();
      wx.showToast({
        title: '搜索失败',
        icon: 'none'
      });
    });
  },

  /**
   * 添加供应商
   */
  addSupplier: function() {
    wx.showToast({
      title: '新增功能开发中',
      icon: 'none'
    });
  },

  /**
   * 查看供应商详情
   */
  viewSupplier: function(e) {
    const supplierId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看供应商 ID: ' + supplierId,
      icon: 'none'
    });
  },

  /**
   * 编辑供应商
   */
  editSupplier: function(e) {
    const supplierId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '编辑供应商 ID: ' + supplierId,
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadSupplierList();
  }
})
