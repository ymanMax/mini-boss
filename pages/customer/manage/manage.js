Page({
  /**
   * 页面的初始数据
   */
  data: {
    customers: [],
    followRecords: [],
    customerForm: {
      name: '',
      phone: '',
      email: '',
      company: '',
      position: '',
      source: '',
      level: 'A'
    },
    followForm: {
      customerId: '',
      content: '',
      type: 'call',
      nextDate: ''
    },
    showCustomerModal: false,
    showFollowModal: false,
    selectedCustomer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCustomers();
    this.loadFollowRecords();
  },

  /**
   * 加载客户列表
   */
  loadCustomers: function() {
    // Mock数据
    const mockCustomers = [
      {
        id: '1',
        name: '张三',
        phone: '13800138001',
        email: 'zhangsan@example.com',
        company: 'ABC科技有限公司',
        position: 'CEO',
        source: '展会',
        level: 'A',
        createTime: '2025-01-15',
        lastFollowTime: '2025-01-20'
      },
      {
        id: '2',
        name: '李四',
        phone: '13800138002',
        email: 'lisi@example.com',
        company: 'XYZ贸易公司',
        position: '采购经理',
        source: '推荐',
        level: 'B',
        createTime: '2025-01-10',
        lastFollowTime: '2025-01-18'
      }
    ];
    this.setData({
      customers: mockCustomers
    });
  },

  /**
   * 加载跟进记录
   */
  loadFollowRecords: function() {
    // Mock数据
    const mockFollowRecords = [
      {
        id: '1',
        customerId: '1',
        customerName: '张三',
        content: '初次沟通，了解客户需求',
        type: 'call',
        createTime: '2025-01-16',
        nextDate: '2025-01-23'
      },
      {
        id: '2',
        customerId: '1',
        customerName: '张三',
        content: '发送产品资料，约定演示时间',
        type: 'meeting',
        createTime: '2025-01-20',
        nextDate: '2025-01-25'
      }
    ];
    this.setData({
      followRecords: mockFollowRecords
    });
  },

  /**
   * 打开添加客户弹窗
   */
  openCustomerModal: function() {
    this.setData({
      showCustomerModal: true
    });
  },

  /**
   * 关闭添加客户弹窗
   */
  closeCustomerModal: function() {
    this.setData({
      showCustomerModal: false
    });
  },

  /**
   * 打开添加跟进记录弹窗
   */
  openFollowModal: function(e) {
    const customerId = e.currentTarget.dataset.customerId;
    this.setData({
      showFollowModal: true,
      'followForm.customerId': customerId
    });
  },

  /**
   * 关闭添加跟进记录弹窗
   */
  closeFollowModal: function() {
    this.setData({
      showFollowModal: false
    });
  },

  /**
   * 处理客户表单输入
   */
  onCustomerInput: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`customerForm.${field}`]: value
    });
  },

  /**
   * 处理跟进表单输入
   */
  onFollowInput: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`followForm.${field}`]: value
    });
  },

  /**
   * 添加客户
   */
  addCustomer: function() {
    const newCustomer = {
      id: Date.now().toString(),
      ...this.data.customerForm,
      createTime: new Date().toISOString().split('T')[0],
      lastFollowTime: new Date().toISOString().split('T')[0]
    };

    this.setData({
      customers: [...this.data.customers, newCustomer],
      showCustomerModal: false,
      customerForm: {
        name: '',
        phone: '',
        email: '',
        company: '',
        position: '',
        source: '',
        level: 'A'
      }
    });

    wx.showToast({
      title: '客户添加成功',
      icon: 'success'
    });
  },

  /**
   * 添加跟进记录
   */
  addFollowRecord: function() {
    const customer = this.data.customers.find(c => c.id === this.data.followForm.customerId);
    const newFollowRecord = {
      id: Date.now().toString(),
      customerId: this.data.followForm.customerId,
      customerName: customer ? customer.name : '',
      ...this.data.followForm,
      createTime: new Date().toISOString().split('T')[0]
    };

    this.setData({
      followRecords: [...this.data.followRecords, newFollowRecord],
      showFollowModal: false,
      followForm: {
        customerId: '',
        content: '',
        type: 'call',
        nextDate: ''
      }
    });

    wx.showToast({
      title: '跟进记录添加成功',
      icon: 'success'
    });
  },

  /**
   * 查看客户详情
   */
  viewCustomerDetail: function(e) {
    const customerId = e.currentTarget.dataset.customerId;
    wx.navigateTo({
      url: `/pages/customer/detail/detail?id=${customerId}`
    });
  }
});