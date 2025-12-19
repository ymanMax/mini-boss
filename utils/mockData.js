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

// 项目管理与任务协作系统 - Mock数据

// 模拟项目数据
const mockProjects = [
  {
    id: 1,
    name: '电商平台重构',
    description: '对现有电商平台进行全面重构，提升用户体验和系统性能',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 500000,
    actualCost: 320000,
    manager: '张三',
    status: 'in_progress',
    progress: 65,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 2,
    name: '移动APP开发',
    description: '开发一款新的移动应用，支持iOS和Android平台',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    budget: 800000,
    actualCost: 150000,
    manager: '李四',
    status: 'in_progress',
    progress: 20,
    createdAt: '2024-02-20T14:30:00Z'
  },
  {
    id: 3,
    name: '数据分析系统建设',
    description: '建立企业级数据分析系统，实现数据可视化和业务智能',
    startDate: '2024-02-01',
    endDate: '2024-05-31',
    budget: 300000,
    actualCost: 300000,
    manager: '王五',
    status: 'completed',
    progress: 100,
    createdAt: '2024-01-25T09:15:00Z'
  },
  {
    id: 4,
    name: 'CRM系统升级',
    description: '升级客户关系管理系统，增加新功能模块',
    startDate: '2024-04-01',
    endDate: '2024-08-31',
    budget: 400000,
    actualCost: 0,
    manager: '赵六',
    status: 'planning',
    progress: 0,
    createdAt: '2024-03-15T16:45:00Z'
  }
]

// 模拟任务数据
const mockTasks = [
  {
    id: 1,
    name: '需求分析与设计',
    description: '完成项目的需求分析和系统设计文档',
    projectId: 1,
    projectName: '电商平台重构',
    assignee: '张三',
    status: 'completed',
    progress: 100,
    deadline: '2024-02-15',
    createdAt: '2024-01-10T11:00:00Z'
  },
  {
    id: 2,
    name: '前端页面开发',
    description: '开发电商平台的前端页面，包括首页、商品详情页、购物车等',
    projectId: 1,
    projectName: '电商平台重构',
    assignee: '李四',
    status: 'in_progress',
    progress: 75,
    deadline: '2024-04-30',
    createdAt: '2024-02-16T09:30:00Z'
  },
  {
    id: 3,
    name: '后端接口开发',
    description: '开发电商平台的后端API接口，支持前端功能',
    projectId: 1,
    projectName: '电商平台重构',
    assignee: '王五',
    status: 'in_progress',
    progress: 60,
    deadline: '2024-04-15',
    createdAt: '2024-02-16T10:00:00Z'
  },
  {
    id: 4,
    name: '数据库设计与优化',
    description: '设计电商平台的数据库结构，并进行性能优化',
    projectId: 1,
    projectName: '电商平台重构',
    assignee: '赵六',
    status: 'completed',
    progress: 100,
    deadline: '2024-02-28',
    createdAt: '2024-01-10T11:30:00Z'
  },
  {
    id: 5,
    name: '移动APP界面设计',
    description: '设计移动APP的用户界面和交互原型',
    projectId: 2,
    projectName: '移动APP开发',
    assignee: '孙七',
    status: 'completed',
    progress: 100,
    deadline: '2024-03-31',
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 6,
    name: 'iOS应用开发',
    description: '开发移动APP的iOS版本',
    projectId: 2,
    projectName: '移动APP开发',
    assignee: '周八',
    status: 'in_progress',
    progress: 30,
    deadline: '2024-07-31',
    createdAt: '2024-04-01T09:00:00Z'
  }
]

// 模拟团队成员数据
const mockTeamMembers = [
  {
    id: 1,
    name: '张三',
    role: '项目经理',
    email: 'zhangsan@company.com',
    phone: '13800138001',
    avatar: '/images/avatar1.png',
    completedTasks: 25,
    projects: 4,
    joinDate: '2022-03-15'
  },
  {
    id: 2,
    name: '李四',
    role: '前端开发工程师',
    email: 'lisi@company.com',
    phone: '13800138002',
    avatar: '/images/avatar2.png',
    completedTasks: 42,
    projects: 6,
    joinDate: '2021-11-05'
  },
  {
    id: 3,
    name: '王五',
    role: '后端开发工程师',
    email: 'wangwu@company.com',
    phone: '13800138003',
    avatar: '/images/avatar3.png',
    completedTasks: 38,
    projects: 5,
    joinDate: '2022-05-20'
  },
  {
    id: 4,
    name: '赵六',
    role: '数据库工程师',
    email: 'zhaoliu@company.com',
    phone: '13800138004',
    avatar: '/images/avatar4.png',
    completedTasks: 22,
    projects: 3,
    joinDate: '2023-01-10'
  },
  {
    id: 5,
    name: '孙七',
    role: 'UI/UX设计师',
    email: 'sunqi@company.com',
    phone: '13800138005',
    avatar: '/images/avatar5.png',
    completedTasks: 35,
    projects: 4,
    joinDate: '2022-08-15'
  },
  {
    id: 6,
    name: '周八',
    role: '移动开发工程师',
    email: 'zhouba@company.com',
    phone: '13800138006',
    avatar: '/images/avatar6.png',
    completedTasks: 18,
    projects: 2,
    joinDate: '2023-03-01'
  }
]

// 模拟文件数据
const mockFiles = [
  {
    id: 1,
    name: '电商平台需求规格说明书.docx',
    size: 2560,
    type: 'document',
    projectId: 1,
    projectName: '电商平台重构',
    uploader: '张三',
    uploadTime: '2024-01-15T14:30:00Z',
    url: '/files/requirement_spec.docx'
  },
  {
    id: 2,
    name: '系统架构设计图.pdf',
    size: 1536,
    type: 'document',
    projectId: 1,
    projectName: '电商平台重构',
    uploader: '张三',
    uploadTime: '2024-01-20T10:15:00Z',
    url: '/files/architecture_design.pdf'
  },
  {
    id: 3,
    name: '前端页面原型.sketch',
    size: 8192,
    type: 'design',
    projectId: 1,
    projectName: '电商平台重构',
    uploader: '李四',
    uploadTime: '2024-02-05T16:45:00Z',
    url: '/files/frontend_prototype.sketch'
  },
  {
    id: 4,
    name: '数据库设计方案.xlsx',
    size: 1024,
    type: 'document',
    projectId: 1,
    projectName: '电商平台重构',
    uploader: '赵六',
    uploadTime: '2024-02-10T09:30:00Z',
    url: '/files/database_design.xlsx'
  },
  {
    id: 5,
    name: '移动APP界面设计稿.zip',
    size: 12288,
    type: 'archive',
    projectId: 2,
    projectName: '移动APP开发',
    uploader: '孙七',
    uploadTime: '2024-03-20T15:20:00Z',
    url: '/files/app_design.zip'
  }
]

// 模拟风险数据
const mockRisks = [
  {
    id: 1,
    projectId: 1,
    projectName: '电商平台重构',
    description: '前端开发进度滞后，可能影响整体项目交付时间',
    level: 'high',
    status: 'identified',
    impact: '项目可能延期2周',
    probability: '70%',
    mitigationPlan: '增加前端开发资源，调整任务优先级',
    identifiedBy: '张三',
    identifiedTime: '2024-03-15T14:30:00Z'
  },
  {
    id: 2,
    projectId: 1,
    projectName: '电商平台重构',
    description: '第三方支付接口稳定性存在风险，可能影响支付功能',
    level: 'medium',
    status: 'mitigated',
    impact: '支付功能可能出现间歇性故障',
    probability: '40%',
    mitigationPlan: '与第三方支付提供商沟通，建立备用支付方案',
    identifiedBy: '王五',
    identifiedTime: '2024-03-20T10:15:00Z'
  },
  {
    id: 3,
    projectId: 2,
    projectName: '移动APP开发',
    description: 'iOS平台审核政策变更，可能影响APP上线时间',
    level: 'medium',
    status: 'identified',
    impact: 'APP可能延期上线1-2周',
    probability: '50%',
    mitigationPlan: '密切关注苹果审核政策，提前准备备用方案',
    identifiedBy: '周八',
    identifiedTime: '2024-04-05T16:45:00Z'
  },
  {
    id: 4,
    projectId: 3,
    projectName: '数据分析系统建设',
    description: '数据来源接口不规范，可能影响数据分析结果的准确性',
    level: 'low',
    status: 'resolved',
    impact: '部分数据分析结果可能存在偏差',
    probability: '20%',
    mitigationPlan: '与数据提供方协作，规范数据接口格式',
    identifiedBy: '王五',
    identifiedTime: '2024-02-10T09:30:00Z'
  }
]

// 为现有的mockApi添加项目管理相关接口
mockApi.getProjects = () => mockApiResponse(mockProjects);
mockApi.getTasks = () => mockApiResponse(mockTasks);
mockApi.getTeamMembers = () => mockApiResponse(mockTeamMembers);
mockApi.getFiles = () => mockApiResponse(mockFiles);
mockApi.getRisks = () => mockApiResponse(mockRisks);

mockApi.createProject = (project) => {
  const newProject = {
    id: Date.now(),
    ...project,
    status: 'planning',
    progress: 0,
    actualCost: 0,
    createdAt: new Date().toISOString()
  };
  mockProjects.push(newProject);
  return mockApiResponse(newProject);
};

mockApi.updateProject = (id, project) => {
  const index = mockProjects.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProjects[index] = { ...mockProjects[index], ...project };
  }
  return mockApiResponse(mockProjects[index]);
};

mockApi.assignTask = (taskId, userId) => {
  const task = mockTasks.find(t => t.id === taskId);
  if (task) {
    task.assignee = userId;
    task.status = 'assigned';
  }
  return mockApiResponse(task);
};

mockApi.updateTaskProgress = (taskId, progress) => {
  const task = mockTasks.find(t => t.id === taskId);
  if (task) {
    task.progress = progress;
    task.status = progress === 100 ? 'completed' : 'in_progress';
  }
  return mockApiResponse(task);
};

mockApi.uploadFile = (file) => {
  const newFile = {
    id: Date.now(),
    ...file,
    uploadTime: new Date().toISOString()
  };
  mockFiles.push(newFile);
  return mockApiResponse(newFile);
};

mockApi.addRisk = (risk) => {
  const newRisk = {
    id: Date.now(),
    ...risk,
    identifiedTime: new Date().toISOString()
  };
  mockRisks.push(newRisk);
  return mockApiResponse(newRisk);
};

// 导出项目管理相关的mock数据
export { mockProjects, mockTasks, mockTeamMembers, mockFiles, mockRisks };

export default mockApi;