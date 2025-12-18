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

export default mockApi;