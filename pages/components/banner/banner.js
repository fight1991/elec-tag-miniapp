// pages/components/banner/banner.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
  },
  pageLifetimes: {
    show () {
      this.setData({
        indicatorDots: this.data.list.length > 1
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: false,
    indicatorColor: 'rgba(255, 255, 255, .3)',
    indicatorActiveColor: 'rgba(255, 255, 255, 1)',
    autoplay: true,
    interval: 3000,
    duration: 500,
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
