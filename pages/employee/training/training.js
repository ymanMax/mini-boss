Page({
  data: {
    activeTab: 'training', // training: 培训计划, development: 发展计划
    employees: [],
    trainingPrograms: [],
    developmentPlans: []
  },

  onLoad() {
    this.loadEmployees();
    this.loadTrainingPrograms();
    this.loadDevelopmentPlans();
  },

  // 加载员工列表
  loadEmployees() {
    const mockEmployees = [
      { id: '1001', name: '张三', department: '技术部', position: '前端工程师' },
      { id: '1002', name: '李四', department: '技术部', position: '后端工程师' },
      { id: '1003', name: '王五', department: '人力资源部', position: 'HR专员' },
      { id: '1004', name: '赵六', department: '财务部', position: '会计' },
      { id: '1005', name: '孙七', department: '市场部', position: '市场经理' }
    ];
    this.setData({ employees: mockEmployees });
  },

  // 加载培训计划
  loadTrainingPrograms() {
    const mockTrainingPrograms = [
      {
        id: 'training001',
        employeeId: '1001',
        employeeName: '张三',
        title: 'React高级开发培训',
        type: '技术培训',
        category: '前端开发',
        description: '深入学习React生态系统，包括Redux、React Router、性能优化等高级主题',
        startDate: '2024-05-01',
        endDate: '2024-06-30',
        duration: '8周',
        schedule: '每周一、三、五 晚上7:00-9:00',
        trainer: '李老师',
        location: '线上培训',
        status: '进行中',
        progress: 60,
        score: null,
        completionDate: null,
        feedback: null
      },
      {
        id: 'training002',
        employeeId: '1002',
        employeeName: '李四',
        title: 'Node.js后端架构师培训',
        type: '技术培训',
        category: '后端开发',
        description: '学习Node.js高级特性、微服务架构、性能调优、安全防护等内容',
        startDate: '2024-04-15',
        endDate: '2024-07-15',
        duration: '12周',
        schedule: '每周二、四 晚上7:00-9:00',
        trainer: '王老师',
        location: '线上培训',
        status: '进行中',
        progress: 45,
        score: null,
        completionDate: null,
        feedback: null
      },
      {
        id: 'training003',
        employeeId: '1003',
        employeeName: '王五',
        title: '人力资源管理师认证培训',
        type: '职业认证',
        category: '人力资源',
        description: '针对人力资源管理师资格认证的系统培训，包括人力资源规划、招聘与配置、培训与开发等模块',
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        duration: '12周',
        schedule: '每周六 上午9:00-12:00',
        trainer: '张老师',
        location: '线下培训中心',
        status: '已完成',
        progress: 100,
        score: 85,
        completionDate: '2024-05-31',
        feedback: '培训内容全面，实用性强，对实际工作帮助很大'
      }
    ];
    this.setData({ trainingPrograms: mockTrainingPrograms });
  },

  // 加载发展计划
  loadDevelopmentPlans() {
    const mockDevelopmentPlans = [
      {
        id: 'dev001',
        employeeId: '1001',
        employeeName: '张三',
        title: '前端开发工程师职业发展计划',
        period: '2024年',
        currentPosition: '前端工程师',
        targetPosition: '高级前端工程师',
        targetDate: '2024-12-31',
        objectives: [
          { content: '精通React生态系统，掌握Redux、React Router等工具', priority: '高', status: '进行中' },
          { content: '学习TypeScript并应用于实际项目', priority: '高', status: '已完成' },
          { content: '提高代码质量和性能优化能力', priority: '中', status: '进行中' },
          { content: '参与至少2个大型前端项目的架构设计', priority: '中', status: '待开始' }
        ],
        skillsGap: [
          { skill: 'React高级特性', currentLevel: '中级', targetLevel: '高级' },
          { skill: 'TypeScript', currentLevel: '高级', targetLevel: '高级' },
          { skill: '性能优化', currentLevel: '中级', targetLevel: '高级' },
          { skill: '架构设计', currentLevel: '初级', targetLevel: '中级' }
        ],
        developmentActivities: [
          { type: '培训', activity: 'React高级开发培训', status: '进行中' },
          { type: '自学', activity: 'TypeScript官方文档学习', status: '已完成' },
          { type: '项目实践', activity: '参与新项目的架构设计', status: '待开始' },
          { type: '导师指导', activity: '每周与技术经理1对1交流', status: '进行中' }
        ],
        progress: 70,
        status: '进行中'
      },
      {
        id: 'dev002',
        employeeId: '1005',
        employeeName: '孙七',
        title: '市场经理职业发展计划',
        period: '2024-2025年',
        currentPosition: '市场经理',
        targetPosition: '市场总监',
        targetDate: '2025-12-31',
        objectives: [
          { content: '完成年度市场推广目标，销售额增长30%', priority: '高', status: '进行中' },
          { content: '建立完善的市场调研和分析体系', priority: '高', status: '进行中' },
          { content: '拓展至少5个新的合作渠道', priority: '中', status: '待开始' },
          { content: '培养2名优秀的市场专员', priority: '中', status: '进行中' }
        ],
        skillsGap: [
          { skill: '战略规划', currentLevel: '中级', targetLevel: '高级' },
          { skill: '团队管理', currentLevel: '中级', targetLevel: '高级' },
          { skill: '数据分析', currentLevel: '中级', targetLevel: '高级' },
          { skill: '行业洞察', currentLevel: '中级', targetLevel: '高级' }
        ],
        developmentActivities: [
          { type: '培训', activity: '高级管理能力培训', status: '待开始' },
          { type: '项目实践', activity: '主导年度市场推广计划', status: '进行中' },
          { type: '导师指导', activity: '每月与总经理1对1交流', status: '进行中' },
          { type: '自学', activity: '市场趋势和行业分析学习', status: '进行中' }
        ],
        progress: 40,
        status: '进行中'
      }
    ];
    this.setData({ developmentPlans: mockDevelopmentPlans });
  },

  // 切换标签
  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    });
  },

  // 添加培训计划
  addTraining() {
    wx.navigateTo({
      url: '/pages/employee/training/add-training'
    });
  },

  // 添加发展计划
  addDevelopment() {
    wx.navigateTo({
      url: '/pages/employee/training/add-development'
    });
  },

  // 查看培训详情
  viewTrainingDetail(e) {
    const trainingId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/training/training-detail?trainingId=${trainingId}`
    });
  },

  // 查看发展计划详情
  viewDevelopmentDetail(e) {
    const developmentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/training/development-detail?developmentId=${developmentId}`
    });
  }
});
