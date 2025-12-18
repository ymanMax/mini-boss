// components/choose-city/choose-city.js
import mockApi from '../../utils/mockData.js'
import cityData from '../../utils/cityData'
Component({
  properties: {

  },
  data: {
    location: '',
    citys: cityData.citys,
    hotCitys: ['深圳', '广州', '上海', '北京'],
    activeTitle: 'hot',
    toView: 'hot'
  },
  async ready() {
    wx.getLocation({
      type: 'gcj02',
      success: async (result) => {
        // 直接使用mock数据获取地址信息
        try {
          const mockResult = await mockApi.coordinate2Address({ location: `${result.latitude},${result.longitude}` });
          this.setData({
            location: mockResult.data.ad_info.city.split('市')[0]
          })
        } catch (error) {
          console.error('获取地址信息失败:', error);
          wx.showToast({ title: '获取地址信息失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.showToast({ title: '定位失败，请手动选择城市', icon: 'none' });
      }
    })
  },
  methods: {
    changeIndex(event) {
      this.setData({
        activeTitle: event.currentTarget.dataset.title,
        toView: event.currentTarget.dataset.title
      })
    },
    confirmCity(event) {
      if (!event.currentTarget.dataset.city) return
      this.triggerEvent('confirmCity', event.currentTarget.dataset.city)
    },
    async getAddressByCoordinate() {
      // 直接使用mock数据获取地址信息
      try {
        const mockResult = await mockApi.coordinate2Address({
          latitude: this.data.latitude,
          longitude: this.data.longitude
        });
        this.setData({
          address: mockResult.data
        })
      } catch (error) {
        console.error('获取地址信息失败:', error);
      }
    },
  }
})
