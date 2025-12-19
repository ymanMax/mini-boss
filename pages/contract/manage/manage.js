Page({
  /**
   * 页面的初始数据
   */
  data: {
    contracts: [],
    contractForm: {
      customerId: '',
      customerName: '',
      contractNumber: '',
      title: '',
      amount: '',
      status: 'draft',
      startDate: '',
      endDate: '',
      signDate: '',
      description: ''
    },
    customers: [],
    showContractModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadContracts();
    this.loadCustomers();
  },

  /**
   * 加载合同列表
   */
  loadContracts: function() {
    // Mock数据
    const mockContracts = [
      {
        id: '1',
        customerId: '1',
        customerName: '张三',
        contractNumber: 'HT2025001',
        title: '企业级CRM系统采购合同',
        amount: '500000',
        status: 'active',
        startDate: '2025-01-01',
        endDate: '2026-12-31',
        signDate: '2025-01-15',
        description: '客户采购企业级CRM系统，包含客户管理、销售跟踪、数据分析等功能，服务期2年',
        createTime: '2025-01-05',
        updateTime: '2025-01-20'
      },
      {
        id: '2',
        customerId: '2',
        customerName: '李四',
        contractNumber: 'HT2025002',
        title: '办公软件升级服务合同',
        amount: '150000',
        status: 'pending',
        startDate: '2025-02-01',
        endDate: '2025-12-31',
        signDate: '',
        description: '客户现有办公软件升级服务，主要涉及协同办公和文档管理功能，服务期1年',
        createTime: '2025-01-10',
        updateTime: '2025-01-18'
      }
    ];
    this.setData({
      contracts: mockContracts
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
   * 打开添加合同弹窗
   */
  openContractModal: function() {
    this.setData({
      showContractModal: true
    });
  },

  /**
   * 关闭添加合同弹窗
   */
  closeContractModal: function() {
    this.setData({
      showContractModal: false
    });
  },

  /**
   * 处理合同表单输入
   */
  onContractInput: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`contractForm.${field}`]: value
    });
  },

  /**
   * 选择客户
   */
  selectCustomer: function(e) {
    const customerId = e.detail.value;
    const customer = this.data.customers.find(c => c.id === customerId);
    this.setData({
      'contractForm.customerId': customerId,
      'contractForm.customerName': customer ? customer.name : ''
    });
  },

  /**
   * 生成合同编号
   */
  generateContractNumber: function() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const contractNumber = `HT${year}${random}`;
    this.setData({
      'contractForm.contractNumber': contractNumber
    });
  },

  /**
   * 添加合同
   */
  addContract: function() {
    // 如果没有手动输入合同编号，自动生成
    if (!this.data.contractForm.contractNumber) {
      this.generateContractNumber();
    }

    const newContract = {
      id: Date.now().toString(),
      ...this.data.contractForm,
      createTime: new Date().toISOString().split('T')[0],
      updateTime: new Date().toISOString().split('T')[0]
    };

    this.setData({
      contracts: [...this.data.contracts, newContract],
      showContractModal: false,
      contractForm: {
        customerId: '',
        customerName: '',
        contractNumber: '',
        title: '',
        amount: '',
        status: 'draft',
        startDate: '',
        endDate: '',
        signDate: '',
        description: ''
      }
    });

    wx.showToast({
      title: '合同添加成功',
      icon: 'success'
    });
  },

  /**
   * 查看合同详情
   */
  viewContractDetail: function(e) {
    const contractId = e.currentTarget.dataset.contractId;
    wx.navigateTo({
      url: `/pages/contract/detail/detail?id=${contractId}`
    });
  },

  /**
   * 下载合同
   */
  downloadContract: function(e) {
    const contractId = e.currentTarget.dataset.contractId;
    wx.showToast({
      title: '合同下载功能开发中',
      icon: 'none'
    });
  }
});