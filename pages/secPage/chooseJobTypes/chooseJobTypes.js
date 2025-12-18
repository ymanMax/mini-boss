// pages/secPage/chooseJobTypes/chooseJobTypes.js
import mockApi from '../../../utils/mockData.js'

Page({
  data: {
    jobTypes: [],
    childTypes: [],
    activeType: null,
    index: 0
  },
  onLoad: async function (options) {
    // 直接使用mock数据获取职位类型
    try {
      const mockResult = await mockApi.getJobTypes();
      this.setData({
        jobTypes: mockResult.data,
        childTypes: mockResult.data[0].childTypes || [],
        activeType: mockResult.data[0] || '',
        index: options.index
      })
    } catch (error) {
      console.error('获取职位类型失败:', error);
    }
  },
  parentTap(event) {
    const parent = event.currentTarget.dataset.parent;
    this.setData({
      activeType: parent,
      childTypes: parent.childTypes || []
    })
  },
  childTap(event) {
    const child = event.currentTarget.dataset.child;
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    
    if (prevPage && prevPage.setExpectItem) {
      prevPage.setExpectItem({
        jobType: child.childTypeName,
        jobTypeId: child.childTypeId
      });
    }
    
    wx.navigateBack({
      delta: 1
    })
  }
})