// pages/main/components/messagePopup.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
  },
  pageLifetimes: {
    show: function () {
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
    noop() {},
    close() {
      this.setData({
        show: false
      })
    },
    subscription () {
      console.log('33333');
      
      this.triggerEvent('subscription')
    }
  }
})