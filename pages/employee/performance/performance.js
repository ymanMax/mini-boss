Page({
  data: {
    activeTab: 'kpi', // kpi: KPI设定, assessment: 绩效考核
    employees: [],
    kpiItems: [],
    assessments: []
  },

  onLoad() {
    this.loadEmployees();
    this.loadKPIItems();
    this.loadAssessments();
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

  // 加载KPI项目
  loadKPIItems() {
    const mockKPIItems = [
      {
        id: 'kpi001',
        employeeId: '1001',
        employeeName: '张三',
        period: '2024年第1季度',
        objectives: [
          { content: '完成3个前端项目开发', weight: 40, target: '100%完成' },
          { content: '优化网站加载速度30%', weight: 30, target: '加载时间<2秒' },
          { content: '代码质量提升', weight: 20, target: '代码审查通过率>95%' },
          { content: '团队协作', weight: 10, target: '积极参与技术分享' }
        ]
      },
      {
        id: 'kpi002',
        employeeId: '1002',
        employeeName: '李四',
        period: '2024年第1季度',
        objectives: [
          { content: '完成后端API开发', weight: 40, target: '100%完成' },
          { content: '数据库性能优化', weight: 30, target: '查询时间<1秒' },
          { content: '系统稳定性保障', weight: 20, target: '系统可用性>99.9%' },
          { content: '文档完善', weight: 10, target: 'API文档完整' }
        ]
      }
    ];
    this.setData({ kpiItems: mockKPIItems });
  },

  // 加载绩效考核记录
  loadAssessments() {
    const mockAssessments = [
      {
        id: 'assess001',
        employeeId: '1001',
        employeeName: '张三',
        period: '2024年第1季度',
        scores: [
          { objective: '完成3个前端项目开发', score: 95, weight: 40 },
          { objective: '优化网站加载速度30%', score: 85, weight: 30 },
          { objective: '代码质量提升', score: 90, weight: 20 },
          { objective: '团队协作', score: 88, weight: 10 }
        ],
        totalScore: 91.3,
        assessor: '王经理',
        assessDate: '2024-04-15',
        comment: '工作表现优秀，项目完成质量高，团队协作能力强'
      },
      {
        id: 'assess002',
        employeeId: '1002',
        employeeName: '李四',
        period: '2024年第1季度',
        scores: [
          { objective: '完成后端API开发', score: 92, weight: 40 },
          { objective: '数据库性能优化', score: 88, weight: 30 },
          { objective: '系统稳定性保障', score: 95, weight: 20 },
          { objective: '文档完善', score: 85, weight: 10 }
        ],
        totalScore: 91.5,
        assessor: '王经理',
        assessDate: '2024-04-16',
        comment: '技术能力强，系统稳定性保障工作出色'
      }
    ];
    this.setData({ assessments: mockAssessments });
  },

  // 切换标签
  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    });
  },

  // 添加KPI设定
  addKPI() {
    wx.navigateTo({
      url: '/pages/employee/performance/add-kpi'
    });
  },

  // 添加绩效考核
  addAssessment() {
    wx.navigateTo({
      url: '/pages/employee/performance/add-assessment'
    });
  },

  // 查看KPI详情
  viewKPIDetail(e) {
    const kpiId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/performance/kpi-detail?kpiId=${kpiId}`
    });
  },

  // 查看考核详情
  viewAssessmentDetail(e) {
    const assessmentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/performance/assessment-detail?assessmentId=${assessmentId}`
    });
  }
});
