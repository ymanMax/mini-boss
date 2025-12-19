Page({
  data: {
    employees: [],
    searchKey: '',
    currentPage: 1,
    pageSize: 10,
    totalCount: 0
  },

  onLoad() {
    this.loadEmployees();
  },

  // 加载员工列表
  loadEmployees() {
    const { currentPage, pageSize, searchKey } = this.data;

    // Mock数据
    const mockEmployees = [
      {
        id: '1001',
        name: '张三',
        department: '技术部',
        position: '前端工程师',
        email: 'zhangsan@company.com',
        phone: '13800138001',
        entryDate: '2020-03-15',
        status: '在职'
      },
      {
        id: '1002',
        name: '李四',
        department: '技术部',
        position: '后端工程师',
        email: 'lisi@company.com',
        phone: '13800138002',
        entryDate: '2019-11-20',
        status: '在职'
      },
      {
        id: '1003',
        name: '王五',
        department: '人力资源部',
        position: 'HR专员',
        email: 'wangwu@company.com',
        phone: '13800138003',
        entryDate: '2021-05-10',
        status: '在职'
      },
      {
        id: '1004',
        name: '赵六',
        department: '财务部',
        position: '会计',
        email: 'zhaoliu@company.com',
        phone: '13800138004',
        entryDate: '2018-08-01',
        status: '在职'
      },
      {
        id: '1005',
        name: '孙七',
        department: '市场部',
        position: '市场经理',
        email: 'sunqi@company.com',
        phone: '13800138005',
        entryDate: '2017-02-15',
        status: '在职'
      }
    ];

    // 模拟搜索过滤
    const filteredEmployees = mockEmployees.filter(emp =>
      emp.name.includes(searchKey) ||
      emp.department.includes(searchKey) ||
      emp.position.includes(searchKey)
    );

    this.setData({
      employees: filteredEmployees,
      totalCount: filteredEmployees.length
    });
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKey: e.detail.value,
      currentPage: 1
    }, () => {
      this.loadEmployees();
    });
  },

  // 查看员工详情
  viewEmployeeDetail(e) {
    const employeeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/manage/detail?employeeId=${employeeId}`
    });
  },

  // 添加员工
  addEmployee() {
    wx.navigateTo({
      url: '/pages/employee/manage/add'
    });
  },

  // 编辑员工
  editEmployee(e) {
    const employeeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/manage/edit?employeeId=${employeeId}`
    });
  },

  // 删除员工
  deleteEmployee(e) {
    const employeeId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该员工吗？',
      success: (res) => {
        if (res.confirm) {
          // 这里可以添加删除逻辑
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
          this.loadEmployees();
        }
      }
    });
  }
});
