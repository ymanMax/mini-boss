import { mockProjects, mockTasks, mockTeamMembers, mockFiles, mockRisks } from '../../../utils/mockData'

Page({
  data: {
    projects: [],
    tasks: [],
    teamMembers: [],
    files: [],
    risks: [],
    activeTab: 'projects',
    showCreateProjectModal: false,
    newProject: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      budget: 0,
      manager: ''
    }
  },

  onLoad() {
    this.loadData()
  },

  loadData() {
    this.setData({
      projects: mockProjects,
      tasks: mockTasks,
      teamMembers: mockTeamMembers,
      files: mockFiles,
      risks: mockRisks
    })
  },

  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    })
  },

  showCreateProjectModal() {
    this.setData({
      showCreateProjectModal: true
    })
  },

  hideCreateProjectModal() {
    this.setData({
      showCreateProjectModal: false
    })
  },

  handleInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`newProject.${field}`]: e.detail.value
    })
  },

  createProject() {
    const { newProject, projects } = this.data
    const project = {
      id: Date.now(),
      ...newProject,
      status: 'planning',
      progress: 0,
      actualCost: 0,
      createdAt: new Date().toISOString()
    }
    this.setData({
      projects: [...projects, project],
      showCreateProjectModal: false,
      newProject: {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: 0,
        manager: ''
      }
    })
    wx.showToast({
      title: '项目创建成功',
      icon: 'success'
    })
  },

  updateProjectStatus(e) {
    const { projectId, status } = e.currentTarget.dataset
    const { projects } = this.data
    const updatedProjects = projects.map(project =>
      project.id === projectId ? { ...project, status } : project
    )
    this.setData({
      projects: updatedProjects
    })
    wx.showToast({
      title: '项目状态更新成功',
      icon: 'success'
    })
  },

  assignTask(e) {
    const { taskId, userId } = e.currentTarget.dataset
    const { tasks } = this.data
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, assignee: userId, status: 'assigned' } : task
    )
    this.setData({
      tasks: updatedTasks
    })
    wx.showToast({
      title: '任务分配成功',
      icon: 'success'
    })
  },

  updateTaskProgress(e) {
    const { taskId, progress } = e.currentTarget.dataset
    const { tasks } = this.data
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, progress, status: progress === 100 ? 'completed' : 'in_progress' } : task
    )
    this.setData({
      tasks: updatedTasks
    })
    wx.showToast({
      title: '进度更新成功',
      icon: 'success'
    })
  },

  uploadFile() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const { files } = this.data
        const newFile = {
          id: Date.now(),
          name: res.tempFiles[0].name,
          size: res.tempFiles[0].size,
          type: res.tempFiles[0].type,
          uploader: '当前用户',
          uploadTime: new Date().toISOString(),
          url: res.tempFiles[0].path
        }
        this.setData({
          files: [...files, newFile]
        })
        wx.showToast({
          title: '文件上传成功',
          icon: 'success'
        })
      }
    })
  },

  addRisk(e) {
    const { projectId } = e.currentTarget.dataset
    wx.showModal({
      title: '添加风险',
      content: '请输入风险描述',
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          const { risks } = this.data
          const newRisk = {
            id: Date.now(),
            projectId,
            description: res.content,
            level: 'medium',
            status: 'identified',
            identifiedBy: '当前用户',
            identifiedTime: new Date().toISOString()
          }
          this.setData({
            risks: [...risks, newRisk]
          })
          wx.showToast({
            title: '风险添加成功',
            icon: 'success'
          })
        }
      }
    })
  }
})