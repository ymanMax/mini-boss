Page({
  /**
   * 页面的初始数据
   */
  data: {
    surveys: [],
    surveyForm: {
      title: '',
      description: '',
      type: 'satisfaction',
      status: 'draft',
      startDate: '',
      endDate: '',
      questions: [
        { id: '1', content: '您对我们的产品/服务整体满意度如何？', type: 'rating', options: [1, 2, 3, 4, 5] },
        { id: '2', content: '您最满意的产品/服务特点是什么？', type: 'text', options: [] },
        { id: '3', content: '您认为我们的产品/服务需要改进的地方是？', type: 'text', options: [] }
      ]
    },
    customers: [],
    showSurveyModal: false,
    showResultsModal: false,
    selectedSurvey: null,
    surveyResults: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadSurveys();
    this.loadCustomers();
  },

  /**
   * 加载调查问卷列表
   */
  loadSurveys: function() {
    // Mock数据
    const mockSurveys = [
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
      },
      {
        id: '3',
        title: '2024年客户满意度调查',
        description: '2024年度客户满意度总结调查',
        type: 'satisfaction',
        status: 'closed',
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        totalResponses: 234,
        avgScore: 4.1,
        createTime: '2024-11-20',
        updateTime: '2024-12-31'
      }
    ];
    this.setData({
      surveys: mockSurveys
    });
  },

  /**
   * 加载客户列表（用于发送调查）
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
   * 打开添加调查弹窗
   */
  openSurveyModal: function() {
    this.setData({
      showSurveyModal: true
    });
  },

  /**
   * 关闭添加调查弹窗
   */
  closeSurveyModal: function() {
    this.setData({
      showSurveyModal: false
    });
  },

  /**
   * 处理调查表单输入
   */
  onSurveyInput: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`surveyForm.${field}`]: value
    });
  },

  /**
   * 添加调查
   */
  addSurvey: function() {
    const newSurvey = {
      id: Date.now().toString(),
      ...this.data.surveyForm,
      totalResponses: 0,
      avgScore: 0,
      createTime: new Date().toISOString().split('T')[0],
      updateTime: new Date().toISOString().split('T')[0]
    };

    this.setData({
      surveys: [...this.data.surveys, newSurvey],
      showSurveyModal: false,
      surveyForm: {
        title: '',
        description: '',
        type: 'satisfaction',
        status: 'draft',
        startDate: '',
        endDate: '',
        questions: [
          { id: '1', content: '您对我们的产品/服务整体满意度如何？', type: 'rating', options: [1, 2, 3, 4, 5] },
          { id: '2', content: '您最满意的产品/服务特点是什么？', type: 'text', options: [] },
          { id: '3', content: '您认为我们的产品/服务需要改进的地方是？', type: 'text', options: [] }
        ]
      }
    });

    wx.showToast({
      title: '调查添加成功',
      icon: 'success'
    });
  },

  /**
   * 查看调查详情
   */
  viewSurveyDetail: function(e) {
    const surveyId = e.currentTarget.dataset.surveyId;
    wx.navigateTo({
      url: `/pages/survey/detail/detail?id=${surveyId}`
    });
  },

  /**
   * 查看调查结果
   */
  viewSurveyResults: function(e) {
    const surveyId = e.currentTarget.dataset.surveyId;
    const survey = this.data.surveys.find(s => s.id === surveyId);

    // Mock调查结果数据
    const mockResults = [
      { questionId: '1', question: '您对我们的产品/服务整体满意度如何？', avgScore: 4.2, responses: 156 },
      { questionId: '2', question: '您最满意的产品/服务特点是什么？', comments: ['功能全面', '界面友好', '数据准确'], responses: 89 },
      { questionId: '3', question: '您认为我们的产品/服务需要改进的地方是？', comments: ['响应速度有待提高', '增加更多的数据分析功能', '优化移动端体验'], responses: 78 }
    ];

    this.setData({
      selectedSurvey: survey,
      surveyResults: mockResults,
      showResultsModal: true
    });
  },

  /**
   * 关闭结果弹窗
   */
  closeResultsModal: function() {
    this.setData({
      showResultsModal: false,
      selectedSurvey: null,
      surveyResults: []
    });
  },

  /**
   * 发送调查
   */
  sendSurvey: function(e) {
    const surveyId = e.currentTarget.dataset.surveyId;
    wx.showToast({
      title: '调查发送功能开发中',
      icon: 'none'
    });
  },

  /**
   * 更新调查状态
   */
  updateSurveyStatus: function(e) {
    const surveyId = e.currentTarget.dataset.surveyId;
    const newStatus = e.currentTarget.dataset.status;

    const updatedSurveys = this.data.surveys.map(survey => {
      if (survey.id === surveyId) {
        return {
          ...survey,
          status: newStatus,
          updateTime: new Date().toISOString().split('T')[0]
        };
      }
      return survey;
    });

    this.setData({
      surveys: updatedSurveys
    });

    wx.showToast({
      title: '调查状态更新成功',
      icon: 'success'
    });
  }
});