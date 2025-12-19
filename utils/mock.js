// 通用Mock数据生成工具
class MockData {
  // 生成随机ID
  static generateId(prefix = 'id') {
    return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }

  // 生成随机日期
  static generateDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  // 生成随机姓名
  static generateName() {
    const familyNames = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈'];
    const givenNames = ['伟', '芳', '秀英', '娜', '敏', '静', '丽', '强', '磊', '军'];
    return familyNames[Math.floor(Math.random() * familyNames.length)] +
           givenNames[Math.floor(Math.random() * givenNames.length)];
  }

  // 生成随机邮箱
  static generateEmail(name) {
    const domains = ['example.com', 'company.com', 'enterprise.com', 'org.cn', 'net.cn'];
    return `${name.toLowerCase()}${Math.floor(Math.random() * 100)}@${domains[Math.floor(Math.random() * domains.length)]}`;
  }

  // 生成随机手机号
  static generatePhone() {
    const prefixes = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139'];
    return prefixes[Math.floor(Math.random() * prefixes.length)] +
           Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  }

  // 生成员工数据
  static generateEmployee(count = 10) {
    const departments = ['技术部', '人力资源部', '财务部', '市场部', '销售部', '运营部'];
    const positions = {
      '技术部': ['前端工程师', '后端工程师', 'UI设计师', '测试工程师', '运维工程师', '架构师'],
      '人力资源部': ['HR专员', '招聘经理', '培训专员', '绩效经理'],
      '财务部': ['会计', '出纳', '财务分析师', '财务经理'],
      '市场部': ['市场专员', '市场经理', '品牌经理', '媒介专员'],
      '销售部': ['销售代表', '销售经理', '客户经理', '区域经理'],
      '运营部': ['运营专员', '运营经理', '产品运营', '用户运营']
    };

    const employees = [];
    for (let i = 0; i < count; i++) {
      const department = departments[Math.floor(Math.random() * departments.length)];
      const position = positions[department][Math.floor(Math.random() * positions[department].length)];
      const name = this.generateName();

      employees.push({
        id: `EMP${(1001 + i).toString().padStart(4, '0')}`,
        name: name,
        department: department,
        position: position,
        email: this.generateEmail(name),
        phone: this.generatePhone(),
        entryDate: this.generateDate('2015-01-01', '2024-01-01').toISOString().split('T')[0],
        status: Math.random() > 0.1 ? '在职' : '离职',
        avatar: `https://picsum.photos/seed/emp${i}/100/100`
      });
    }
    return employees;
  }

  // 生成绩效考核数据
  static generatePerformanceData(employees, countPerEmployee = 2) {
    const assessments = [];
    const periods = ['2024年第1季度', '2024年第2季度', '2023年第3季度', '2023年第4季度'];

    employees.forEach(employee => {
      for (let i = 0; i < countPerEmployee; i++) {
        const period = periods[i % periods.length];
        const objectives = [
          { content: '完成项目开发任务', weight: 40, score: Math.floor(Math.random() * 20) + 80 },
          { content: '提高工作效率', weight: 25, score: Math.floor(Math.random() * 20) + 80 },
          { content: '团队协作能力', weight: 20, score: Math.floor(Math.random() * 20) + 80 },
          { content: '学习与成长', weight: 15, score: Math.floor(Math.random() * 20) + 80 }
        ];

        const totalScore = objectives.reduce((sum, obj) => sum + (obj.score * obj.weight / 100), 0);

        assessments.push({
          id: this.generateId('assess'),
          employeeId: employee.id,
          employeeName: employee.name,
          period: period,
          objectives: objectives,
          totalScore: parseFloat(totalScore.toFixed(1)),
          assessor: this.generateName(),
          assessDate: this.generateDate('2023-01-01', '2024-12-31').toISOString().split('T')[0],
          comment: '工作表现良好，需继续努力提升技能水平'
        });
      }
    });

    return assessments;
  }

  // 生成考勤数据
  static generateAttendanceData(employees, months = 3) {
    const attendanceRecords = [];

    employees.forEach(employee => {
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setMonth(startDate.getMonth() - months);

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        // 跳过周末
        if (d.getDay() === 0 || d.getDay() === 6) continue;

        const clockInHour = Math.floor(Math.random() * 3) + 8; // 8-10点
        const clockInMinute = Math.floor(Math.random() * 60);
        const clockOutHour = Math.floor(Math.random() * 4) + 17; // 17-20点
        const clockOutMinute = Math.floor(Math.random() * 60);

        const status = clockInHour > 9 ? '迟到' :
                      clockOutHour < 18 ? '早退' : '正常';

        attendanceRecords.push({
          id: this.generateId('att'),
          employeeId: employee.id,
          employeeName: employee.name,
          date: d.toISOString().split('T')[0],
          clockIn: `${clockInHour.toString().padStart(2, '0')}:${clockInMinute.toString().padStart(2, '0')}`,
          clockOut: `${clockOutHour.toString().padStart(2, '0')}:${clockOutMinute.toString().padStart(2, '0')}`,
          workingHours: clockOutHour - clockInHour + (clockOutMinute - clockInMinute) / 60,
          status: status,
          note: status !== '正常' ? '交通原因' : ''
        });
      }
    });

    return attendanceRecords;
  }

  // 生成薪资数据
  static generateSalaryData(employees, months = 6) {
    const salaryRecords = [];

    employees.forEach(employee => {
      // 根据职位设置基本工资范围
      const baseSalaryMap = {
        '前端工程师': [8000, 15000],
        '后端工程师': [9000, 18000],
        'UI设计师': [7000, 14000],
        '测试工程师': [7000, 13000],
        'HR专员': [6000, 12000],
        '会计': [6000, 13000],
        '市场经理': [10000, 25000],
        '销售代表': [5000, 10000]
      };

      const baseSalaryRange = baseSalaryMap[employee.position] || [5000, 10000];
      const baseSalary = Math.floor(Math.random() * (baseSalaryRange[1] - baseSalaryRange[0])) + baseSalaryRange[0]);

      // 生成最近几个月的薪资记录
      for (let i = 0; i < months; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const period = `${date.getFullYear()}年${(date.getMonth() + 1).toString().padStart(2, '0')}月`;

        const bonus = Math.floor(Math.random() * 3000);
        const overtimePay = Math.floor(Math.random() * 1000);
        const allowance = 300;

        const tax = Math.max(0, Math.floor((baseSalary + bonus + overtimePay + allowance - 5000) * 0.1));
        const socialSecurity = Math.floor(baseSalary * 0.1);
        const housingFund = Math.floor(baseSalary * 0.08);

        const netSalary = baseSalary + bonus + overtimePay + allowance - tax - socialSecurity - housingFund;

        salaryRecords.push({
          id: this.generateId('salary'),
          employeeId: employee.id,
          employeeName: employee.name,
          period: period,
          basicSalary: baseSalary,
          bonus: bonus,
          overtimePay: overtimePay,
          allowance: allowance,
          deductions: {
            tax: tax,
            socialSecurity: socialSecurity,
            housingFund: housingFund,
            other: 0
          },
          netSalary: netSalary,
          status: i === 0 ? '待发放' : '已发放',
          payDate: i === 0 ? new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0] :
                    new Date(date.getFullYear(), date.getMonth() + 1, 5).toISOString().split('T')[0]
        });
      }
    });

    return salaryRecords;
  }

  // 生成培训计划数据
  static generateTrainingData(employees, countPerEmployee = 1) {
    const trainingPrograms = [];
    const trainingTitles = [
      'React高级开发培训',
      'Node.js后端架构师培训',
      '人力资源管理师认证培训',
      '财务数据分析培训',
      '市场推广策略培训',
      '销售技巧提升培训',
      '项目管理PMP认证培训',
      '云计算AWS认证培训',
      '数据科学与机器学习培训',
      '沟通与领导力培训'
    ];

    employees.forEach(employee => {
      for (let i = 0; i < countPerEmployee; i++) {
        const title = trainingTitles[Math.floor(Math.random() * trainingTitles.length)];
        const startDate = this.generateDate('2024-01-01', '2024-12-31');
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 6) + 2); // 2-8个月

        const statuses = ['待开始', '进行中', '已完成'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const progress = status === '已完成' ? 100 : status === '进行中' ? Math.floor(Math.random() * 80) + 20 : 0;

        trainingPrograms.push({
          id: this.generateId('training'),
          employeeId: employee.id,
          employeeName: employee.name,
          title: title,
          type: Math.random() > 0.5 ? '技术培训' : '职业培训',
          category: '专业技能',
          description: '系统学习相关专业知识和技能，提升工作能力和职业素养',
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          duration: `${Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))}天`,
          schedule: '每周一、三、五 晚上7:00-9:00',
          trainer: this.generateName(),
          location: Math.random() > 0.3 ? '线上培训' : '线下培训中心',
          status: status,
          progress: progress,
          score: status === '已完成' ? Math.floor(Math.random() * 30) + 70 : null,
          completionDate: status === '已完成' ? endDate.toISOString().split('T')[0] : null,
          feedback: status === '已完成' ? '培训内容实用，对工作有很大帮助' : null
        });
      }
    });

    return trainingPrograms;
  }
}

// 导出Mock数据工具
module.exports = MockData;
