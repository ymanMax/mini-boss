/**
 * Mock数据模块 - 用于模拟API接口返回数据
 * 根据页面展示逻辑设计合理的模拟数据
 */

// 模拟职位类型数据
const mockJobTypes = [
  {
    id: 1,
    typeName: '技术类',
    childTypes: [
      { childTypeId: 101, childTypeName: '前端开发' },
      { childTypeId: 102, childTypeName: '后端开发' },
      { childTypeId: 103, childTypeName: '移动开发' },
      { childTypeId: 104, childTypeName: '测试工程师' },
      { childTypeId: 105, childTypeName: '运维工程师' }
    ]
  },
  {
    id: 2,
    typeName: '产品类',
    childTypes: [
      { childTypeId: 201, childTypeName: '产品经理' },
      { childTypeId: 202, childTypeName: '产品助理' }
    ]
  },
  {
    id: 3,
    typeName: '设计类',
    childTypes: [
      { childTypeId: 301, childTypeName: 'UI设计师' },
      { childTypeId: 302, childTypeName: '交互设计师' }
    ]
  },
  {
    id: 4,
    typeName: '运营类',
    childTypes: [
      { childTypeId: 401, childTypeName: '内容运营' },
      { childTypeId: 402, childTypeName: '活动运营' }
    ]
  },
  {
    id: 5,
    typeName: '市场类',
    childTypes: [
      { childTypeId: 501, childTypeName: '市场营销' },
      { childTypeId: 502, childTypeName: '品牌推广' }
    ]
  }
];

// 模拟公司数据
const mockCompanies = [
  {
    companyId: 1,
    companyName: '腾讯科技',
    companySize: 5,
    financingType: 6,
    industry: '互联网',
    logo: '/public/company.png'
  },
  {
    companyId: 2,
    companyName: '阿里巴巴',
    companySize: 5,
    financingType: 6,
    industry: '电商',
    logo: '/public/company.png'
  },
  {
    companyId: 3,
    companyName: '字节跳动',
    companySize: 4,
    financingType: 5,
    industry: '互联网',
    logo: '/public/company.png'
  },
  {
    companyId: 4,
    companyName: '华为技术',
    companySize: 5,
    financingType: 6,
    industry: '通信',
    logo: '/public/company.png'
  },
  {
    companyId: 5,
    companyName: '百度',
    companySize: 4,
    financingType: 6,
    industry: '互联网',
    logo: '/public/company.png'
  }
];

// 模拟职位数据
const generateMockJobs = () => {
  const jobTitles = [
    '高级前端开发工程师', 'Java开发工程师', 'iOS开发工程师', 
    '产品经理', 'UI设计师', '运营专员', '测试工程师',
    '后端开发工程师', 'Android开发工程师', '数据分析师'
  ];
  
  const cities = ['北京', '上海', '深圳', '广州', '杭州', '成都'];
  
  return jobTitles.map((title, index) => {
    const company = mockCompanies[index % mockCompanies.length];
    const salaryRange = [
      { min: 15, max: 25 },
      { min: 20, max: 30 },
      { min: 25, max: 40 },
      { min: 30, max: 50 }
  ][index % 4];
    
    return {
      jobId: index + 1,
      jobTitle: title,
      jobType: title.includes('前端') ? '前端开发' : 
               title.includes('Java') ? '后端开发' :
               title.includes('iOS') ? '移动开发' :
               title.includes('产品') ? '产品经理' :
               title.includes('UI') ? 'UI设计师' :
               title.includes('运营') ? '内容运营' :
               title.includes('测试') ? '测试工程师' :
               title.includes('Android') ? '移动开发' :
               title.includes('数据') ? '数据分析师' : '其他',
      minSalary: salaryRange.min,
      maxSalary: salaryRange.max,
      city: cities[index % cities.length],
      workExperience: [1, 3, 5, 7][index % 4],
      education: ['大专', '本科', '硕士'][index % 3],
      jobDescription: `岗位职责：\n1. 负责${title}相关工作\n2. 参与产品需求分析和设计\n3. 完成代码开发和测试工作\n\n任职要求：\n1. ${[1, 3, 5, 7][index % 4]}年以上相关工作经验\n2. 熟悉相关技术栈\n3. 良好的团队合作精神`,
      companyId: company,
      exactAddress: {
        lat: 39.9042 + (index * 0.01),
        lng: 116.4074 + (index * 0.01),
        address: `${company.companyName}${cities[index % cities.length]}分公司`
      },
      publishTime: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString()
    };
  });
};

const mockJobs = generateMockJobs();

// 模拟用户数据
const mockUserInfo = {
  openId: 'mock_openid_123456',
  nickName: '张三',
  avatarUrl: '/public/user.png',
  gender: 1,
  birthday: '1990-01-01',
  workDate: '2015-07-01',
  userPostStatus: '0',
  jobofLooking: [
    {
      city: '北京',
      jobType: '前端开发',
      minSalary: 20,
      maxSalary: 30
    }
  ],
  userWebSite: ['https://github.com/zhangsan']
};

// 模拟搜索历史数据
const mockSearchHistory = [
  '前端开发', 'Java开发', '产品经理', 'UI设计师'
];

// Mock API 响应函数
const mockApiResponse = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: 'success',
        data: data
      });
    }, delay);
  });
};

// 模拟各个API接口的响应
const mockApi = {
  // 用户相关接口
  authApi: (data) => mockApiResponse({ openId: 'mock_openid_' + Date.now() }),
  getUser: () => mockApiResponse(mockUserInfo),
  postUserInfo: (data) => {
    // 模拟更新用户信息
    Object.assign(mockUserInfo, data);
    return mockApiResponse(mockUserInfo);
  },
  
  // 职位相关接口
  getJobList: (data) => {
    const { current = 1, size = 10, keyWords = '', jobTypeId = '' } = data || {};
    
    // 模拟筛选逻辑
    let filteredJobs = mockJobs;
    
    if (keyWords) {
      filteredJobs = filteredJobs.filter(job => 
        job.jobTitle.includes(keyWords) || job.jobType.includes(keyWords)
      );
    }
    
    if (jobTypeId) {
      filteredJobs = filteredJobs.filter(job => {
        const jobType = mockJobTypes.flatMap(type => type.childTypes)
          .find(child => child.childTypeId == jobTypeId);
        return jobType && job.jobType === jobType.childTypeName;
      });
    }
    
    // 模拟分页
    const startIndex = (current - 1) * size;
    const endIndex = startIndex + size;
    const records = filteredJobs.slice(startIndex, endIndex);
    
    return mockApiResponse({
      records: records,
      total: filteredJobs.length,
      current: current,
      size: size
    });
  },
  
  getJobTypes: () => mockApiResponse(mockJobTypes),
  
  getJobDetail: (data) => {
    const { jobId } = data || {};
    const job = mockJobs.find(j => j.jobId == jobId) || mockJobs[0];
    return mockApiResponse(job);
  },
  
  // 搜索相关接口
  getSearchHistory: (data) => mockApiResponse(mockSearchHistory),
  addSearchHistory: (data) => {
    const { jobType } = data || {};
    if (jobType && !mockSearchHistory.includes(jobType)) {
      mockSearchHistory.unshift(jobType);
      // 保持最多10条历史记录
      if (mockSearchHistory.length > 10) {
        mockSearchHistory.pop();
      }
    }
    return mockApiResponse({ success: true });
  },
  
  // 文件上传接口
  uploadFile: (data) => mockApiResponse({
    url: '/public/upload/mock_image_' + Date.now() + '.jpg',
    fileName: 'mock_file.jpg'
  }),
  
  // 地理位置接口
  coordinate2Address: (data) => mockApiResponse({
    address: '北京市朝阳区某某街道某某号',
    city: '北京市',
    district: '朝阳区'
  }),
  
  // 公司相关接口
  addCompany: (data) => mockApiResponse({ success: true, companyId: mockCompanies.length + 1 }),
  addJob: (data) => mockApiResponse({ success: true, jobId: mockJobs.length + 1 })
};

// CRM系统相关Mock数据

// 客户相关Mock数据
const customerMockData = {
  // 客户列表
  list: [
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
  ],

  // 跟进记录
  followRecords: [
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
  ]
};

// 销售相关Mock数据
const salesMockData = {
  // 销售机会
  opportunities: [
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
  ],

  // 销售预测数据
  forecast: {
    monthly: [
      { month: '1月', actual: 120000, forecast: 150000, probability: 85 },
      { month: '2月', actual: 145000, forecast: 180000, probability: 78 },
      { month: '3月', actual: 0, forecast: 220000, probability: 65 },
      { month: '4月', actual: 0, forecast: 200000, probability: 55 },
      { month: '5月', actual: 0, forecast: 190000, probability: 45 },
      { month: '6月', actual: 0, forecast: 210000, probability: 35 }
    ]
  }
};

// 合同相关Mock数据
const contractMockData = {
  // 合同列表
  list: [
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
  ]
};

// 订单相关Mock数据
const orderMockData = {
  // 订单列表
  list: [
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
  ]
};

// 客户服务相关Mock数据
const serviceMockData = {
  // 服务工单
  tickets: [
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
    }
  ],

  // 客服人员
  agents: [
    { id: '1', name: '李四' },
    { id: '2', name: '王五' },
    { id: '3', name: '赵六' }
  ]
};

// 满意度调查相关Mock数据
const surveyMockData = {
  // 调查列表
  list: [
    {
      id: '1',
      title: '2025年第一季度客户满意度调查',
      description: '了解客户对我们产品和服务的满意度，收集改进建议',
      type: 'satisfaction',
      status: 'active',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      totalResponses: 156,
      avgScore: 4.2,
      createTime: '2024-12-20',
      updateTime: '2025-01-15'
    },
    {
      id: '2',
      title: '新功能使用反馈调查',
      description: '针对最新推出的CRM数据分析功能收集客户使用反馈',
      type: 'feedback',
      status: 'active',
      startDate: '2025-01-10',
      endDate: '2025-02-28',
      totalResponses: 89,
      avgScore: 4.5,
      createTime: '2025-01-05',
      updateTime: '2025-01-20'
    }
  ]
};

// 供应链管理相关Mock数据
const supplierMockData = {
  // 供应商列表
  list: [
    {
      id: '1',
      supplierName: '华为技术有限公司',
      contactPerson: '张明',
      phone: '13900139001',
      email: 'zhangming@huawei.com',
      address: '深圳市龙岗区坂田华为基地',
      industry: '通信设备',
      rating: 4.8,
      status: 'active',
      createTime: '2024-05-10',
      lastCooperationTime: '2025-01-20'
    },
    {
      id: '2',
      supplierName: '阿里巴巴集团',
      contactPerson: '李强',
      phone: '13900139002',
      email: 'liqiang@alibaba.com',
      address: '杭州市余杭区阿里巴巴园区',
      industry: '电商平台',
      rating: 4.6,
      status: 'active',
      createTime: '2024-03-15',
      lastCooperationTime: '2025-01-18'
    },
    {
      id: '3',
      supplierName: '腾讯科技有限公司',
      contactPerson: '王芳',
      phone: '13900139003',
      email: 'wangfang@tencent.com',
      address: '深圳市南山区腾讯大厦',
      industry: '互联网服务',
      rating: 4.9,
      status: 'active',
      createTime: '2024-08-20',
      lastCooperationTime: '2025-01-15'
    }
  ]
};

const purchaseOrderMockData = {
  // 采购订单列表
  list: [
    {
      id: 'PO2025001',
      supplierId: '1',
      supplierName: '华为技术有限公司',
      orderDate: '2025-01-15',
      expectedDeliveryDate: '2025-01-25',
      actualDeliveryDate: '',
      totalAmount: 500000,
      status: 'approved',
      approver: '张经理',
      approvalTime: '2025-01-16',
      items: [
        { productId: '1', productName: '服务器设备', quantity: 10, unitPrice: 50000 }
      ]
    },
    {
      id: 'PO2025002',
      supplierId: '2',
      supplierName: '阿里巴巴集团',
      orderDate: '2025-01-18',
      expectedDeliveryDate: '2025-01-28',
      actualDeliveryDate: '',
      totalAmount: 200000,
      status: 'pending',
      approver: '',
      approvalTime: '',
      items: [
        { productId: '2', productName: '云服务套餐', quantity: 5, unitPrice: 40000 }
      ]
    }
  ]
};

const inventoryMockData = {
  // 库存列表
  list: [
    {
      id: '1',
      productId: '1',
      productName: '服务器设备',
      category: '硬件设备',
      currentStock: 25,
      safetyStock: 10,
      unit: '台',
      warehouse: '北京 warehouse',
      lastUpdateTime: '2025-01-20'
    },
    {
      id: '2',
      productId: '2',
      productName: '云服务套餐',
      category: '软件服务',
      currentStock: 8,
      safetyStock: 5,
      unit: '套',
      warehouse: '上海 warehouse',
      lastUpdateTime: '2025-01-18'
    },
    {
      id: '3',
      productId: '3',
      productName: '网络交换机',
      category: '网络设备',
      currentStock: 5,
      safetyStock: 10,
      unit: '台',
      warehouse: '广州 warehouse',
      lastUpdateTime: '2025-01-15'
    }
  ]
};

const logisticsMockData = {
  // 物流信息
  list: [
    {
      id: '1',
      orderId: 'PO2025001',
      logisticsNumber: 'SF1234567890',
      carrier: '顺丰快递',
      status: 'transit',
      currentLocation: '北京中转站',
      updateTime: '2025-01-20 14:30:00',
      trackingHistory: [
        { time: '2025-01-16 09:00:00', location: '深圳仓库', status: '已发货' },
        { time: '2025-01-17 15:00:00', location: '广州中转站', status: '运输中' },
        { time: '2025-01-20 14:30:00', location: '北京中转站', status: '运输中' }
      ]
    },
    {
      id: '2',
      orderId: 'PO2025002',
      logisticsNumber: 'YT0987654321',
      carrier: '圆通快递',
      status: 'shipped',
      currentLocation: '杭州仓库',
      updateTime: '2025-01-19 10:00:00',
      trackingHistory: [
        { time: '2025-01-18 16:00:00', location: '杭州仓库', status: '已发货' }
      ]
    }
  ]
};

const supplyChainAnalyticsData = {
  // 供应链数据分析
  supplierPerformance: [
    { supplier: '华为技术', onTimeDelivery: 98, qualityRate: 99, costEfficiency: 95 },
    { supplier: '阿里巴巴', onTimeDelivery: 95, qualityRate: 97, costEfficiency: 93 },
    { supplier: '腾讯科技', onTimeDelivery: 99, qualityRate: 98, costEfficiency: 96 }
  ],
  inventoryTurnover: [
    { month: '10月', turnover: 5.2 },
    { month: '11月', turnover: 4.8 },
    { month: '12月', turnover: 5.5 },
    { month: '1月', turnover: 6.1 }
  ],
  orderFulfillment: [
    { period: '周', fulfilled: 98, pending: 2, delayed: 0 }
  ]
};

// 为现有的mockApi添加CRM相关接口
mockApi.getCustomerList = () => mockApiResponse(customerMockData.list);
mockApi.getCustomerFollowRecords = (data) => {
  const { customerId } = data || {};
  const records = customerMockData.followRecords.filter(record => record.customerId === customerId);
  return mockApiResponse(records);
};

mockApi.getSalesOpportunities = () => mockApiResponse(salesMockData.opportunities);
mockApi.getSalesForecast = (data) => {
  const { period = 'monthly' } = data || {};
  return mockApiResponse(salesMockData.forecast[period]);
};

mockApi.getContractList = () => mockApiResponse(contractMockData.list);
mockApi.getOrderList = () => mockApiResponse(orderMockData.list);
mockApi.getServiceTickets = () => mockApiResponse(serviceMockData.tickets);
mockApi.getSurveyList = () => mockApiResponse(surveyMockData.list);

// 添加供应链管理相关接口
mockApi.getSupplierList = () => mockApiResponse(supplierMockData.list);
mockApi.getPurchaseOrderList = () => mockApiResponse(purchaseOrderMockData.list);
mockApi.getInventoryList = () => mockApiResponse(inventoryMockData.list);
mockApi.getLogisticsList = () => mockApiResponse(logisticsMockData.list);
mockApi.getSupplyChainAnalytics = () => mockApiResponse(supplyChainAnalyticsData);
mockApi.approvePurchaseOrder = (data) => {
  const { orderId, approver } = data || {};
  const order = purchaseOrderMockData.list.find(o => o.id === orderId);
  if (order) {
    order.status = 'approved';
    order.approver = approver;
    order.approvalTime = new Date().toISOString().split('T')[0];
  }
  return mockApiResponse({ success: true });
};
mockApi.rejectPurchaseOrder = (data) => {
  const { orderId, reason } = data || {};
  const order = purchaseOrderMockData.list.find(o => o.id === orderId);
  if (order) {
    order.status = 'rejected';
  }
  return mockApiResponse({ success: true });
};

export default mockApi;