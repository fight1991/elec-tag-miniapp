// pages/main/main.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件参数设置，传递到组件
    navBarHeight: 60,
    navTop: 0,
    menuButtonInfo:{},
    carTotal: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navBarHeight: app.getSafeData()['bottomTop'],
      navTop: app.getSafeData()['navTop']
    })
  },
  onShow: function () {

  },
  onReady: function () {
    
  },
  // 获取车辆数量
  getCarNum (e) {
    this.data.carTotal = e.detail
    this.setData({
      carTotal: e.detail
    })
  }
})