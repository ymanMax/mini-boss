// pages/secPage/expectPage/expectPage.js
import tool from '../../../utils/common'
import mockApi from '../../../utils/mockData.js'

Page({
  data: {
    isIphone: false,
    expectItem: {},
    index: '',
    jobTypes: [],
    childTypes: [],
    salaryColumns: [
      [
        {
          value: '面议',
          key: 0
        },
        {
          value: '1k',
          key: 1
        },
        {
          value: '2k',
          key: 2
        },
        {
          value: '3k',
          key: 3
        },
        {
          value: '4k',
          key: 4
        },
        {
          value: '5k',
          key: 5
        },
        {
          value: '6k',
          key: 6
        },
        {
          value: '7k',
          key: 7
        },
        {
          value: '8k',
          key: 8
        },
        {
          value: '9k',
          key: 9
        },
        {
          value: '10k',
          key: 10
        },
        {
          value: '11k',
          key: 11
        },
        {
          value: '12k',
          key: 12
        },
        {
          value: '13k',
          key: 13
        },
        {
          value: '14k',
          key: 14
        },
        {
          value: '15k',
          key: 15
        },
        {
          value: '16k',
          key: 16
        },
        {
          value: '17k',
          key: 17
        },
        {
          value: '18k',
          key: 18
        },
        {
          value: '19k',
          key: 19
        },
        {
          value: '20k',
          key: 20
        },
        {
          value: '25k',
          key: 25
        },
        {
          value: '30k',
          key: 30
        },
        {
          value: '35k',
          key: 35
        },
        {
          value: '40k',
          key: 40
        },
        {
          value: '50k',
          key: 50
        },
        {
          value: '60k',
          key: 60
        },
        {
          value: '80k',
          key: 80
        },
        {
          value: '100k',
          key: 100
        },
        {
          value: '150k',
          key: 150
        },
        {
          value: '200k',
          key: 200
        },
      ],
      [
        {
          value: '面议',
          key: 0
        }
      ]
    ],
    activeType: '',
    showPop: false,
    showTypes: false,
    showCitys: false
  },
  onLoad: function (options) {
    let system = getApp().globalData.systemInfo
    if (system.model.indexOf('iPhone X') > -1 || system.model.indexOf('iPhone 11') > -1) {
      this.setData({
        isIphone: true,
      })
    }
    this.setData({
      expectItem: JSON.parse(options.expectItem) || {},
      index: options.index
    })
  },
  async toChooseJobTypes() {
    // 直接使用mock数据获取职位类型
    try {
      const mockResult = await mockApi.getJobTypes();
      this.setData({
        jobTypes: mockResult.data,
        childTypes: mockResult.data[0].childTypes || [],
        activeType: mockResult.data[0] || '',
        showPop: true,
        showTypes: true
      })
    } catch (error) {
      console.error('获取职位类型失败:', error);
    }
    // wx.navigateTo({ url: `/pages/secPage/chooseJobTypes/chooseJobTypes?index=${this.data.index}` })
  },
  changeParent(e) {
    this.setData({
      childTypes: this.data.jobTypes[e.detail].childTypes,
      activeType: this.data.jobTypes[e.detail]
    })
  },
  confirmType(e) {
    this.data.expectItem.jobType = e.detail.childTypeName
    this.data.expectItem.jobTypeId = e.detail._id
    this.setData({
      expectItem: this.data.expectItem,
      showTypes: false,
      showPop: false
    })
  },
  confirmCity(e) {
    this.data.expectItem.city = e.detail
    this.setData({
      expectItem: this.data.expectItem,
      showCitys: false,
      showPop: false
    })
  },
  chooseCity(){
    // this.data.expectItem.city = '武汉'
    this.setData({
      showCitys: true,
      showPop: true
    })
  },
  chooseSalarys(event) {
    console.log(event)
    if(event.detail.value[0] === 0) {
      this.data.expectItem.minSalary = 0
      this.data.expectItem.maxSalary = 0
    } else {
      this.data.expectItem.minSalary = event.detail.value[0]
      this.data.expectItem.maxSalary = event.detail.value[0] + event.detail.value[1] + 1
    }
    this.setData({
      expectItem: this.data.expectItem
    })
  },
  bindcolumnchange(event) {
    if (event.detail.column === 0) {
      if (event.detail.value === 0) {
        this.data.salaryColumns[1] = [{ value: '面议', key: 0 }]
        this.setData({
          salaryColumns: this.data.salaryColumns
        })
      } else if (event.detail.value === 30) {
        this.data.salaryColumns[1] = [{ value: '300k', key: 300 }]
        this.setData({
          salaryColumns: this.data.salaryColumns
        })
      } else {
        this.data.salaryColumns[1] = this.data.salaryColumns[0].slice(event.detail.value + 1)
        this.setData({
          salaryColumns: this.data.salaryColumns
        })
      }
    }
  },
  async commit() {
    let _user = getApp().globalData.userInfo
    this.data.index == 3 && _user.jobofLooking.push(this.data.expectItem)
    this.data.index != 3 && (_user.jobofLooking[this.data.index] = this.data.expectItem)
    tool.arrayDeleteEmpty(_user.jobofLooking) 
    // 直接使用mock数据提交用户信息
    try {
      const mockResult = await mockApi.postUserInfo({ openId: wx.getStorageSync('token'), jobofLooking: _user.jobofLooking });
      if (mockResult.code === 200) {
        wx.setStorageSync('userInfo', mockResult.data)
        getApp().globalData.userInfo = mockResult.data
        wx.showToast({
          title: '提交成功',
        })
        wx.navigateBack({
          delta: 1
        })
      }
    } catch (error) {
      console.error('提交用户信息失败:', error);
      wx.showToast({
        title: '提交失败',
        icon: 'none'
      })
    }
  },
  async handleDelete() {
    let _user = wx.getStorageSync('userInfo')
    console.log(_user)
    _user.jobofLooking.splice(this.data.index, 1)
    // 直接使用mock数据提交用户信息
    try {
      const mockResult = await mockApi.postUserInfo({ openId: wx.getStorageSync('token'), jobofLooking: _user.jobofLooking });
      if (mockResult.code === 200) {
        wx.setStorageSync('userInfo', mockResult.data)
        getApp().globalData.userInfo = mockResult.data
        wx.showToast({
          title: '删除成功',
        })
        wx.navigateBack({
          delta: 1
        })
      }
    } catch (error) {
      console.error('删除用户信息失败:', error);
      wx.showToast({
        title: '删除失败',
        icon: 'none'
      })
    }
  },
  closeDialog() {
    this.setData({
      showPop: false,
      showTypes: false,
      showCitys: false
    })
  }
})