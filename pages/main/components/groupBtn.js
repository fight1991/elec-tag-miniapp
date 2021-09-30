// pages/main/components/groupBtn.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    bgImg: {
      car: app.utils.imgTobase64('/pages/image/index/car-bg.png'),
      plate: app.utils.imgTobase64('/pages/image/index/plate-bg.png'),
      scan: app.utils.imgTobase64('/pages/image/index/scan-bg.png')
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    elecClick () {
      this.triggerEvent('elecClick')
    },
    carInfoClick () {
      this.triggerEvent('carInfoClick')
    },
    scanClick () {
      this.triggerEvent('scanClick')
    },
    
  }
})