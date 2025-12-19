Page({
  /**
   * 页面的初始数据
   */
  data: {
    serviceTickets: [],
    ticketForm: {
      customerId: '',
      customerName: '',
      ticketNumber: '',
      title: '',
      priority: 'medium',
      status: 'open',
      type: 'technical',
      description: '',
      assignedTo: ''
    },
    customers: [],
    agents: [],
    showTicketModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadServiceTickets();
    this.loadCustomers();
    this.loadAgents();
  },

  /**
   * 加载服务工单列表
   */
  loadServiceTickets: function() {
    // Mock数据
    const mockTickets = [
      {
        id: '1',
        customerId: '1',
        customerName: '张三',
        ticketNumber: 'SR2025001',
        title: 'CRM系统登录问题',
        priority: 'high',
        status: 'open',
        type: 'technical',
        description: '客户反映无法登录CRM系统，提示用户名或密码错误，但客户确认用户名密码正确',
        assignedTo: '李四',
        createTime: '2025-01-20',
        updateTime: '2025-01-20'
      },
      {
        id: '2',
        customerId: '2',
        customerName: '李四',
        ticketNumber: 'SR2025002',
        title: '办公软件使用培训',
        priority: 'medium',
        status: 'in_progress',
        type: 'training',
        description: '客户需要对新升级的办公软件进行使用培训，主要涉及协同办公和文档管理功能',
        assignedTo: '王五',
        createTime: '2025-01-19',
        updateTime: '2025-01-20'
      },
      {
        id: '3',
        customerId: '1',
        customerName: '张三',
        ticketNumber: 'SR2025003',
        title: '系统功能咨询',
        priority: 'low',
        status: 'closed',
        type: 'consultation',
        description: '客户咨询CRM系统的数据分析功能如何使用，已通过电话解答完毕',
        assignedTo: '李四',
        createTime: '2025-01-18',
        updateTime: '2025-01-18'
      }
    ];
    this.setData({
      serviceTickets: mockTickets
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
   * 加载客服人员列表（用于分配工单）
   */
  loadAgents: function() {
    // Mock数据
    const mockAgents = [
      { id: '1', name: '李四' },
      { id: '2', name: '王五' },
      { id: '3', name: '赵六' }
    ];
    this.setData({
      agents: mockAgents
    });
  },

  /**
   * 打开添加工单弹窗
   */
  openTicketModal: function() {
    this.setData({
      showTicketModal: true
    });
  },

  /**
   * 关闭添加工单弹窗
   */
  closeTicketModal: function() {
    this.setData({
      showTicketModal: false
    });
  },

  /**
   * 处理工单表单输入
   */
  onTicketInput: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`ticketForm.${field}`]: value
    });
  },

  /**
   * 选择客户
   */
  selectCustomer: function(e) {
    const customerId = e.detail.value;
    const customer = this.data.customers.find(c => c.id === customerId);
    this.setData({
      'ticketForm.customerId': customerId,
      'ticketForm.customerName': customer ? customer.name : ''
    });
  },

  /**
   * 选择客服人员
   */
  selectAgent: function(e) {
    const agentId = e.detail.value;
    const agent = this.data.agents.find(a => a.id === agentId);
    this.setData({
      'ticketForm.assignedTo': agent ? agent.name : ''
    });
  },

  /**
   * 生成工单编号
   */
  generateTicketNumber: function() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const ticketNumber = `SR${year}${random}`;
    this.setData({
      'ticketForm.ticketNumber': ticketNumber
    });
  },

  /**
   * 添加工单
   */
  addTicket: function() {
    // 如果没有手动输入工单编号，自动生成
    if (!this.data.ticketForm.ticketNumber) {
      this.generateTicketNumber();
    }

    const newTicket = {
      id: Date.now().toString(),
      ...this.data.ticketForm,
      createTime: new Date().toISOString().split('T')[0],
      updateTime: new Date().toISOString().split('T')[0]
    };

    this.setData({
      serviceTickets: [...this.data.serviceTickets, newTicket],
      showTicketModal: false,
      ticketForm: {
        customerId: '',
        customerName: '',
        ticketNumber: '',
        title: '',
        priority: 'medium',
        status: 'open',
        type: 'technical',
        description: '',
        assignedTo: ''
      }
    });

    wx.showToast({
      title: '工单添加成功',
      icon: 'success'
    });
  },

  /**
   * 查看工单详情
   */
  viewTicketDetail: function(e) {
    const ticketId = e.currentTarget.dataset.ticketId;
    wx.navigateTo({
      url: `/pages/service/detail/detail?id=${ticketId}`
    });
  },

  /**
   * 更新工单状态
   */
  updateTicketStatus: function(e) {
    const ticketId = e.currentTarget.dataset.ticketId;
    const newStatus = e.currentTarget.dataset.status;

    const updatedTickets = this.data.serviceTickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          updateTime: new Date().toISOString().split('T')[0]
        };
      }
      return ticket;
    });

    this.setData({
      serviceTickets: updatedTickets
    });

    wx.showToast({
      title: '工单状态更新成功',
      icon: 'success'
    });
  },

  /**
   * 分配工单
   */
  assignTicket: function(e) {
    const ticketId = e.currentTarget.dataset.ticketId;
    wx.showToast({
      title: '工单分配功能开发中',
      icon: 'none'
    });
  }
});