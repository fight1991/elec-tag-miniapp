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
      showCompass: true
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
    },
    setCurrentPosOnMap ({ latitude, longitude }) {
      this.initMap({
        latitude,
        longitude
      })
    },
    // 标点
    setMarkersOnMap (arr) {
      let markers = arr.map(v => {
        if (v.location) {
          return {
            id: v.longitude,
            longitude: v.longitude,
            latitude: v.latitude
          }
        } else {
          return {
            id: v.orgId * 1,
            longitude: v.longitude,
            latitude: v.latitude,
            iconPath: '/pages/image/icons/location_map.png',
            width: 17,
            height: 22
          } 
        }
      })
      /**
       * 注意:经测试
       * setData({
          setting: {
            markers: [] // 真机不支持
            includePoint: [], // 真机和模拟器都不支持
          }
        })
       * 
       */
      let MapContext = wx.createMapContext('map', this)
      MapContext.addMarkers({
        markers
      })
      this.setIncludePoints(markers)
    },
    // 将标点显示在视图范围内
    setIncludePoints (points) {
      let MapContext = wx.createMapContext('map', this)
      MapContext.includePoints({
        points: points,
        padding: [100, 100, 100, 100]
      })
    },
    // 视野发生变化
    regionchange (e) {
      // 当手动滑动时引起的视野变化时触发
      if (e.type == 'begin' && e.causedBy == 'gesture') {
        this.triggerEvent('regionchange')
      }
    }
  }
})
