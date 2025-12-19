Page({
  data: {
    activeTab: 'salary', // salary: 工资管理, payslip: 工资条
    employees: [],
    salaryRecords: [],
    payslips: []
  },

  onLoad() {
    this.loadEmployees();
    this.loadSalaryRecords();
    this.loadPayslips();
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

  // 加载薪资记录
  loadSalaryRecords() {
    const mockSalaryRecords = [
      {
        id: 'salary001',
        employeeId: '1001',
        employeeName: '张三',
        period: '2024年03月',
        basicSalary: 8000,
        bonus: 2000,
        overtimePay: 500,
        allowance: 300,
        deductions: {
          tax: 1200,
          socialSecurity: 800,
          housingFund: 600,
          other: 0
        },
        netSalary: 8200,
        status: '已发放',
        payDate: '2024-04-05'
      },
      {
        id: 'salary002',
        employeeId: '1002',
        employeeName: '李四',
        period: '2024年03月',
        basicSalary: 9000,
        bonus: 2500,
        overtimePay: 800,
        allowance: 300,
        deductions: {
          tax: 1500,
          socialSecurity: 900,
          housingFund: 700,
          other: 0
        },
        netSalary: 9500,
        status: '已发放',
        payDate: '2024-04-05'
      },
      {
        id: 'salary003',
        employeeId: '1003',
        employeeName: '王五',
        period: '2024年03月',
        basicSalary: 7000,
        bonus: 1500,
        overtimePay: 0,
        allowance: 200,
        deductions: {
          tax: 1000,
          socialSecurity: 700,
          housingFund: 500,
          other: 0
        },
        netSalary: 6500,
        status: '已发放',
        payDate: '2024-04-05'
      },
      {
        id: 'salary004',
        employeeId: '1004',
        employeeName: '赵六',
        period: '2024年04月',
        basicSalary: 7500,
        bonus: 0,
        overtimePay: 0,
        allowance: 200,
        deductions: {
          tax: 0,
          socialSecurity: 0,
          housingFund: 0,
          other: 0
        },
        netSalary: 7700,
        status: '待发放',
        payDate: '2024-05-05'
      }
    ];
    this.setData({ salaryRecords: mockSalaryRecords });
  },

  // 加载工资条
  loadPayslips() {
    const mockPayslips = [
      {
        id: 'payslip001',
        employeeId: '1001',
        employeeName: '张三',
        period: '2024年03月',
        issueDate: '2024-04-05',
        status: '已查看',
        items: [
          { category: '收入', details: [
            { name: '基本工资', amount: 8000 },
            { name: '绩效奖金', amount: 2000 },
            { name: '加班工资', amount: 500 },
            { name: '餐补', amount: 300 }
          ]},
          { category: '扣除', details: [
            { name: '个人所得税', amount: 1200 },
            { name: '社保', amount: 800 },
            { name: '公积金', amount: 600 }
          ]}
        ],
        totalIncome: 10800,
        totalDeduction: 2600,
        netSalary: 8200
      },
      {
        id: 'payslip002',
        employeeId: '1002',
        employeeName: '李四',
        period: '2024年03月',
        issueDate: '2024-04-05',
        status: '未查看',
        items: [
          { category: '收入', details: [
            { name: '基本工资', amount: 9000 },
            { name: '绩效奖金', amount: 2500 },
            { name: '加班工资', amount: 800 },
            { name: '餐补', amount: 300 }
          ]},
          { category: '扣除', details: [
            { name: '个人所得税', amount: 1500 },
            { name: '社保', amount: 900 },
            { name: '公积金', amount: 700 }
          ]}
        ],
        totalIncome: 12600,
        totalDeduction: 3100,
        netSalary: 9500
      }
    ];
    this.setData({ payslips: mockPayslips });
  },

  // 切换标签
  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    });
  },

  // 添加薪资记录
  addSalary() {
    wx.navigateTo({
      url: '/pages/employee/salary/add-salary'
    });
  },

  // 生成工资条
  generatePayslip() {
    wx.showModal({
      title: '生成工资条',
      content: '确定要生成本月工资条吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '生成成功',
            icon: 'success'
          });
          this.loadPayslips();
        }
      }
    });
  },

  // 发放工资
  paySalary(e) {
    const salaryId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '发放工资',
      content: '确定要发放选中的工资吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '发放成功',
            icon: 'success'
          });
          this.loadSalaryRecords();
        }
      }
    });
  },

  // 查看薪资详情
  viewSalaryDetail(e) {
    const salaryId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/salary/salary-detail?salaryId=${salaryId}`
    });
  },

  // 查看工资条
  viewPayslip(e) {
    const payslipId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/salary/payslip? payslipId=${payslipId}`
    });
  }
});
