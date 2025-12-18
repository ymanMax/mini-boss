Page({
  data: {
    activeTab: 'attendance', // attendance: 考勤记录, leave: 请假审批
    employees: [],
    attendanceRecords: [],
    leaveApplications: []
  },

  onLoad() {
    this.loadEmployees();
    this.loadAttendanceRecords();
    this.loadLeaveApplications();
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

  // 加载考勤记录
  loadAttendanceRecords() {
    const mockAttendance = [
      {
        id: 'att001',
        employeeId: '1001',
        employeeName: '张三',
        date: '2024-04-15',
        clockIn: '09:00',
        clockOut: '18:00',
        workingHours: 8,
        status: '正常',
        note: ''
      },
      {
        id: 'att002',
        employeeId: '1001',
        employeeName: '张三',
        date: '2024-04-16',
        clockIn: '09:15',
        clockOut: '18:00',
        workingHours: 7.75,
        status: '迟到',
        note: '交通拥堵'
      },
      {
        id: 'att003',
        employeeId: '1002',
        employeeName: '李四',
        date: '2024-04-15',
        clockIn: '08:45',
        clockOut: '18:30',
        workingHours: 9.75,
        status: '正常',
        note: '加班处理紧急问题'
      },
      {
        id: 'att004',
        employeeId: '1003',
        employeeName: '王五',
        date: '2024-04-15',
        clockIn: '09:00',
        clockOut: '18:00',
        workingHours: 8,
        status: '正常',
        note: ''
      }
    ];
    this.setData({ attendanceRecords: mockAttendance });
  },

  // 加载请假申请
  loadLeaveApplications() {
    const mockLeaveApplications = [
      {
        id: 'leave001',
        employeeId: '1001',
        employeeName: '张三',
        leaveType: '事假',
        startDate: '2024-04-20',
        endDate: '2024-04-22',
        days: 3,
        reason: '家中有事需要处理',
        status: '已批准',
        approver: '王经理',
        approveDate: '2024-04-18',
        comment: '同意请假'
      },
      {
        id: 'leave002',
        employeeId: '1004',
        employeeName: '赵六',
        leaveType: '病假',
        startDate: '2024-04-19',
        endDate: '2024-04-19',
        days: 1,
        reason: '感冒发烧',
        status: '待审批',
        approver: '',
        approveDate: '',
        comment: ''
      },
      {
        id: 'leave003',
        employeeId: '1005',
        employeeName: '孙七',
        leaveType: '年假',
        startDate: '2024-05-01',
        endDate: '2024-05-07',
        days: 7,
        reason: '年度休假',
        status: '已拒绝',
        approver: '李总监',
        approveDate: '2024-04-17',
        comment: '五一期间业务繁忙，建议调整休假时间'
      }
    ];
    this.setData({ leaveApplications: mockLeaveApplications });
  },

  // 切换标签
  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    });
  },

  // 添加考勤记录
  addAttendance() {
    wx.navigateTo({
      url: '/pages/employee/attendance/add-attendance'
    });
  },

  // 添加请假申请
  addLeave() {
    wx.navigateTo({
      url: '/pages/employee/attendance/add-leave'
    });
  },

  // 审批请假申请
  approveLeave(e) {
    const leaveId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/attendance/approve-leave?leaveId=${leaveId}`
    });
  },

  // 查看考勤详情
  viewAttendanceDetail(e) {
    const attendanceId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/attendance/attendance-detail?attendanceId=${attendanceId}`
    });
  },

  // 查看请假详情
  viewLeaveDetail(e) {
    const leaveId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/employee/attendance/leave-detail?leaveId=${leaveId}`
    });
  }
});
