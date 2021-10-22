// pages/components/currentPosition/currentPosition.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconColor: {
      type: String,
      value: '#fff'
    },
    iconSize: {
      type: String,
      value: '40rpx'
    },
    onTime: { // 是否跟随全局地址信息
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentPlace: ''
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached () {
      this.setData({
        currentPlace: app.currentPos.title
      })
    }
  },
  methods: {
    placeSearch () {
      let { currentPlace, onTime } = this.data
      if (currentPlace) {
        wx.navigateTo({
          url: `/pages/subPages/citySelector/citySelector?title=${currentPlace}&onTime=${onTime}`,
        })
      }
    },
    // 获取选择的地址信息
    getSelectedPlace ({ latitude, longitude, city, pois, title, province }) {
      // 是否更新到全局
      if (this.data.onTime) {
        app.savePosition({ latitude, longitude, city, pois, title, province })
      }
      this.setData({
        currentPlace: title
      })
      this.triggerEvent('getSelectedPlace', { latitude, longitude, city, pois, title, province })
    }
  }
})
