// pages/components/confirmDialog/confirmDialog.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  options: {
  },
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bgImg: app.utils.imgTobase64('/pages/image/coupon/remind-bg.png')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelBtn () {
      this.setData({
        visible: false
      })
    },
    confirmBtn () {
      this.setData({
        visible: false
      })
      this.triggerEvent('close')
    }
  }
})
