// pages/subPages/scanIntoPlay/out.js
var app = getApp()
const { enterInit } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 1.如果app.ssToken有值，说明登陆过，直接赋值初始化
    if (app.ssToken) {
      this.setData({
        phone: app.globalData.userInfo.mobile
      })
      this.getScanInit()
      return
    }
    // 2.本地无token, 去登陆 
    let token = wx.getStorageSync('token')
    if (!token) {
      app.redirect = '/pages/subPages/scanIntoPlay/out'
      wx.reLaunch({
        url: '/pages/login/loginType'
      })
      return
    }
    // 3.本地有token, 初始化信息（适用于关闭小程序再进入时app.ssToken无值）
    app.ssToken = token
    let res = await app.saveUserBusinessInfo()
    if (!res) return
    this.setData({
      phone: app.globalData.userInfo.mobile
    })
    this.getScanInit()
  },
  // 出场码输入
  changeCode (e) {
    this.data.authCode = e.detail
  },
  // 出场
  async confirmOut () {
    let authCode = this.data.authCode
    if (authCode.length != 6) {
      app.messageBox.common('请输入6位数出场码！')
      return
    }
    wx.hideKeyboard()
    wx.navigateTo({
      url: `./outDetail?authCode=${authCode}`
    })
  },
  // 扫码初始化
  async getScanInit () {
    // let { result } = await scanInit({
    //   qrcodeId: this.data.qrcodeId
    // })
    // if (result) {
    // }
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