// pages/subPages/parking/nearParking.js
const chooseLocation = requirePlugin('chooseLocation')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    destination: '' // 目的地
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  searchPlace () {
    let { key, referer } = app.appLBS
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
    })
  },
  // 从地图上选点返回
  getMapPoint () {
    const location = chooseLocation.getLocation()
    if (location) {
      console.log(location)
      this.setData({
        destination: location.name
      })
      // 重新查找附近的停车场
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getMapPoint()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    chooseLocation.setLocation(null)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})