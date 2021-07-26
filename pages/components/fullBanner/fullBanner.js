// pages/subPages/components/fullBanner/fullBanner.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgSrc: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navTop: 0,
    navHeight: 0,
  },
  lifetimes: {
    attached () {
      this.initTopHeight()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化状态栏的高度
    initTopHeight () {
      this.setData({
        navTop: app.navTop,
        navHeight: app.navHeight
      })
    },
  }
})
