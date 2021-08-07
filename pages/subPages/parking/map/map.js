// pages/subPages/parking/map/map.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: '100vh'
    },
    width: {
      type: String,
      value: '100vw'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    setting: {
      showLocation: true,
      latitude: 31.57,
      longitude: 120.30,
      markers: []
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 设置地图当前位置,及标点
    initMap (obj) {
      this.setData({
        setting: obj
      })
    }
  }
})
