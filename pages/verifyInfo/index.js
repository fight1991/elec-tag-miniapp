// pages/verifyInfo/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authPersonal: false,
    authVehicleLicense: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转到实名认证页面
  goToRealName () {
    wx.navigateTo({
      url: './verifyRealName',
    })
  },
  // 行驶证认证
  goToLicense () {
    let { authPersonal } = this.data
    if (!authPersonal) {
      app.messageBox.common('请先进行实名认证!')
      return
    }
    wx.navigateTo({
      url: './verifyLicense',
    })
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
    let { authPersonal, authVehicleLicense } = app.globalData.userInfo
    this.setData({
      authPersonal,
      authVehicleLicense
    })
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