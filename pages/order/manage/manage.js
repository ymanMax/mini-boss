Page({
  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    orderForm: {
      customerId: '',
      customerName: '',
      orderNumber: '',
      contractId: '',
      contractNumber: '',
      title: '',
      amount: '',
      status: 'pending',
      orderDate: '',
      deliveryDate: '',
      description: ''
    },
    customers: [],
    contracts: [],
    showOrderModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOrders();
    this.loadCustomers();
    this.loadContracts();
  },

  /**
   * 加载订单列表
   */
  loadOrders: function() {
    // Mock数据
    const mockOrders = [
      {
        id: '1',
        customerId: '1',
        customerName: '张三',
        orderNumber: 'SO2025001',
        contractId: '1',
        contractNumber: 'HT2025001',
        title: '企业级CRM系统采购订单',
        amount: '500000',
        status: 'paid',
        orderDate: '2025-01-15',
        deliveryDate: '2025-02-01',
        description: '客户采购企业级CRM系统，包含客户管理、销售跟踪、数据分析等功能',
        createTime: '2025-01-15',
        updateTime: '2025-01-20'
      },
      {
        id: '2',
        customerId: '2',
        customerName: '李四',
        orderNumber: 'SO2025002',
        contractId: '2',
        contractNumber: 'HT2025002',
        title: '办公软件升级服务订单',
        amount: '150000',
        status: 'pending',
        orderDate: '2025-01-18',
        deliveryDate: '2025-02-15',
        description: '客户现有办公软件升级服务，主要涉及协同办公和文档管理功能',
        createTime: '2025-01-18',
        updateTime: '2025-01-18'
      }
    ];
    this.setData({
      orders: mockOrders
    });
  },

  /**
   * 加载客户列表（用于选择客户）
   */
  loadCustomers: function() {
    // Mock数据
    const mockCustomers = [
      { id: '1', name: '张三' },
      { id: '2', name: '李四' }
    ];
    this.setData({
      customers: mockCustomers
    });
  },

  /**
   * 加载合同列表（用于选择合同）
   */
  loadContracts: function() {
    // Mock数据
    const mockContracts = [
      { id: '1', number: 'HT2025001', title: '企业级CRM系统采购合同' },
      { id: '2', number: 'HT2025002', title: '办公软件升级服务合同' }
    ];
    this.setData({
      contracts: mockContracts
    });
  },

  /**
   * 打开添加订单弹窗
   */
  openOrderModal: function() {
    this.setData({
      showOrderModal: true
    });
  },

  /**
   * 关闭添加订单弹窗
   */
  closeOrderModal: function() {
    this.setData({
      showOrderModal: false
    });
  },

  /**
   * 处理订单表单输入
   */
  onOrderInput: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`orderForm.${field}`]: value
    });
  },

  /**
   * 选择客户
   */
  selectCustomer: function(e) {
    const customerId = e.detail.value;
    const customer = this.data.customers.find(c => c.id === customerId);
    this.setData({
      'orderForm.customerId': customerId,
      'orderForm.customerName': customer ? customer.name : ''
    });
  },

  /**
   * 选择合同
   */
  selectContract: function(e) {
    const contractId = e.detail.value;
    const contract = this.data.contracts.find(c => c.id === contractId);
    this.setData({
      'orderForm.contractId': contractId,
      'orderForm.contractNumber': contract ? contract.number : ''
    });
  },

  /**
   * 生成订单编号
   */
  generateOrderNumber: function() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumber = `SO${year}${random}`;
    this.setData({
      'orderForm.orderNumber': orderNumber
    });
  },

  /**
   * 添加订单
   */
  addOrder: function() {
    // 如果没有手动输入订单编号，自动生成
    if (!this.data.orderForm.orderNumber) {
      this.generateOrderNumber();
    }

    const newOrder = {
      id: Date.now().toString(),
      ...this.data.orderForm,
      createTime: new Date().toISOString().split('T')[0],
      updateTime: new Date().toISOString().split('T')[0]
    };

    this.setData({
      orders: [...this.data.orders, newOrder],
      showOrderModal: false,
      orderForm: {
        customerId: '',
        customerName: '',
        orderNumber: '',
        contractId: '',
        contractNumber: '',
        title: '',
        amount: '',
        status: 'pending',
        orderDate: '',
        deliveryDate: '',
        description: ''
      }
    });

    wx.showToast({
      title: '订单添加成功',
      icon: 'success'
    });
  },

  /**
   * 查看订单详情
   */
  viewOrderDetail: function(e) {
    const orderId = e.currentTarget.dataset.orderId;
    wx.navigateTo({
      url: `/pages/order/detail/detail?id=${orderId}`
    });
  },

  /**
   * 更新订单状态
   */
  updateOrderStatus: function(e) {
    const orderId = e.currentTarget.dataset.orderId;
    const newStatus = e.currentTarget.dataset.status;

    const updatedOrders = this.data.orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          updateTime: new Date().toISOString().split('T')[0]
        };
      }
      return order;
    });

    this.setData({
      orders: updatedOrders
    });

    wx.showToast({
      title: '订单状态更新成功',
      icon: 'success'
    });
  },

  /**
   * 下载订单
   */
  downloadOrder: function(e) {
    const orderId = e.currentTarget.dataset.orderId;
    wx.showToast({
      title: '订单下载功能开发中',
      icon: 'none'
    });
  }
});