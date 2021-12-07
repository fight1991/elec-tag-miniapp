// pages/subPages/scanIntoPlay/out.js
var app = getApp()
const { scanInit, outScan } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authCode: '',
    qrcodeId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // // 获取二维码所带参数
    if (options.q) {
      let option = decodeURIComponent(options.q)
      let qrcodeId = option.split('id=')[1]
      if (!qrcodeId) return
      wx.setStorageSync('outId', qrcodeId)
    }
    let outId = wx.getStorageSync('outId')
    if (!outId) {
      app.messageBox.common('请用微信扫一扫，重新扫码！')
      return
    }
    this.data.qrcodeId = outId
    // this.data.qrcodeId = '1824064333806569923'

    // 1.如果app.ssToken有值，说明登陆过，直接赋值初始化
    if (app.ssToken) {
      await this.getScanInit()
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
    await app.saveUserBusinessInfo()
    await this.getScanInit()
  },
  // 出场码输入
  changeCode (e) {
    this.setData({
      authCode: e.detail
    })
    if (this.data.authCode.length == 6) {
      wx.hideKeyboard()
    }
  },
  // 出场
  async confirmOut () {
    let { authCode, qrcodeId } = this.data
    if (authCode.length != 6) {
      app.messageBox.common('请输入6位数出场码！')
      return
    }
   this.getOutScan(authCode, qrcodeId)
  },
  // 扫码初始化
  async getScanInit () {
    let { result } = await scanInit({
      qrcodeId: this.data.qrcodeId
    })
    if (result) {
      // 出场码本地缓存有时自动填入
      let outCode = wx.getStorageSync('outCode')
      if (outCode) {
        let blockCodeComponent = this.selectComponent('#blockCode')
        if (!blockCodeComponent) {
          return
        }
        blockCodeComponent.closeFocus()
        this.setData({
          authCode: outCode
        })
      }
    }
  },
  async getOutScan (authCode, qrcodeId) {
    let { result } = await outScan({
      authCode,
      qrcodeId
    })
    if (result) {
      wx.hideKeyboard()
      let { orgName, plateNo, tradeNo, inDate, outDate, totalAmount, status } = result
      let obj = {
        orgName,
        plateNo,
        tradeNo, 
        inDate, 
        outDate,
        totalAmount,
        status,
        billingDuration: app.utils.formatHours(result.billingDuration)
      }
      wx.reLaunch({
        url: `./outDetail?param=${JSON.stringify(obj)}`
      })
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