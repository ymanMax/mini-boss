Page({
  /**
   * 页面的初始数据
   */
  data: {
    opportunities: [],
    opportunityForm: {
      customerId: '',
      customerName: '',
      title: '',
      amount: '',
      stage: 'prospect',
      probability: '30%',
      expectedCloseDate: '',
      assignedTo: '',
      description: ''
    },
    customers: [],
    showOpportunityModal: false,
    salesChartData: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      data: [120000, 150000, 180000, 160000, 200000, 220000]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOpportunities();
    this.loadCustomers();
  },

  /**
   * 加载销售机会列表
   */
  loadOpportunities: function() {
    // Mock数据
    const mockOpportunities = [
      {
        id: '1',
        customerId: '1',
        customerName: '张三',
        title: '企业级CRM系统采购',
        amount: '500000',
        stage: 'negotiation',
        probability: '70%',
        expectedCloseDate: '2025-02-15',
        assignedTo: '李四',
        description: '客户需要一套完整的CRM系统，包含客户管理、销售跟踪、数据分析等功能',
        createTime: '2025-01-05',
        updateTime: '2025-01-20'
      },
      {
        id: '2',
        customerId: '2',
        customerName: '李四',
        title: '办公软件升级',
        amount: '150000',
        stage: 'proposal',
        probability: '50%',
        expectedCloseDate: '2025-02-28',
        assignedTo: '王五',
        description: '客户现有办公软件需要升级，主要涉及协同办公和文档管理功能',
        createTime: '2025-01-10',
        updateTime: '2025-01-18'
      }
    ];
    this.setData({
      opportunities: mockOpportunities
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
   * 打开添加销售机会弹窗
   */
  openOpportunityModal: function() {
    this.setData({
      showOpportunityModal: true
    });
  },

  /**
   * 关闭添加销售机会弹窗
   */
  closeOpportunityModal: function() {
    this.setData({
      showOpportunityModal: false
    });
  },

  /**
   * 处理销售机会表单输入
   */
  onOpportunityInput: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`opportunityForm.${field}`]: value
    });

    // 根据销售阶段更新赢率
    if (field === 'stage') {
      let probability = '30%';
      switch (value) {
        case 'prospect':
          probability = '30%';
          break;
        case 'qualify':
          probability = '50%';
          break;
        case 'proposal':
          probability = '60%';
          break;
        case 'negotiation':
          probability = '70%';
          break;
        case 'close':
          probability = '100%';
          break;
        default:
          probability = '30%';
      }
      this.setData({
        'opportunityForm.probability': probability
      });
    }
  },

  /**
   * 选择客户
   */
  selectCustomer: function(e) {
    const customerId = e.detail.value;
    const customer = this.data.customers.find(c => c.id === customerId);
    this.setData({
      'opportunityForm.customerId': customerId,
      'opportunityForm.customerName': customer ? customer.name : ''
    });
  },

  /**
   * 添加销售机会
   */
  addOpportunity: function() {
    const newOpportunity = {
      id: Date.now().toString(),
      ...this.data.opportunityForm,
      createTime: new Date().toISOString().split('T')[0],
      updateTime: new Date().toISOString().split('T')[0]
    };

    this.setData({
      opportunities: [...this.data.opportunities, newOpportunity],
      showOpportunityModal: false,
      opportunityForm: {
        customerId: '',
        customerName: '',
        title: '',
        amount: '',
        stage: 'prospect',
        probability: '30%',
        expectedCloseDate: '',
        assignedTo: '',
        description: ''
      }
    });

    wx.showToast({
      title: '销售机会添加成功',
      icon: 'success'
    });
  },

  /**
   * 查看销售机会详情
   */
  viewOpportunityDetail: function(e) {
    const opportunityId = e.currentTarget.dataset.opportunityId;
    wx.navigateTo({
      url: `/pages/sales/detail/detail?id=${opportunityId}`
    });
  },

  /**
   * 查看销售预测报告
   */
  viewSalesForecast: function() {
    wx.navigateTo({
      url: '/pages/sales/forecast/forecast'
    });
  }
});