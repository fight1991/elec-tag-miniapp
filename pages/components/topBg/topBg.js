// pages/components/topBg/topBg.js
const app = getApp()
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
    navBarHeight: 116,
  },
  lifetimes: {
    attached: function () {
        let info = JSON.parse(wx.getStorageSync('navInfo'))
        this.setData({
          navBarHeight: info.navBarHeight+56
        })
    },
},
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
