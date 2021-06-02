// pages/main/components/recommendPoint.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pointName: {
      type: String,
      value: ''
    },
    pointDis: {
      type: String,
      value: ''
    },
    address: {
      type: String,
      value: ''
    },
    lat: {
      type: Number,
      value: 0
    },
    lon: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBtn () {
      let { lat, lon, pointName, address } = this.data
      wx.openLocation({
        latitude: lat,
        longitude: lon,
        name: pointName,
        address
      })
    }
  }
})
