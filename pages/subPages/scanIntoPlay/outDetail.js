// pages/subPages/scanIntoPlay/outDetail.js
var app = getApp()
const { lockCoupon, addPay, outScan } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgName: '',
    plateNo: '',
    tradeOrderNo: '', 
    inDate: '', 
    outDate: '',
    billingDuration: '',
    totalAmount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let authCode = options.authCode
    if (authCode) {
      this.getDetail(authCode)
    }
  },
  // 支付金额
  async confirmPay() {
    let flag = await this.lockCouponFun()
    if (!flag) return
    this.addPayFun()
  },
  // 锁定金额
  async lockCouponFun () {
    let { result } = await lockCoupon({
      tradeOrderNo: this.data.tradeOrderNo,
      couponReceiveExt: null
    })
    if (result) {
      return true
    }
  },
  // 去支付
  async addPayFun () {
    let { result } = await addPay(obj)
    if (result) {
      let code = result.statusCode
      //支付中
      if (code == '1') {
        this.requestWx(result.payInfoObject)
      }
    }
  },
  //微信支付
  requestWx (payInfoObject) {
    let {  timeStamp, nonceStr, package:packagePay, signType, paySign } = payInfoObject
    let appId = 'wxad5aa7899b2c6297'
    wx.requestPayment(
      {
        appId,
        timeStamp,
        nonceStr,
        package: packagePay,
        signType,
        paySign,
        success:(res) => {
          console.log('微信支付成功', res);
        },
        fail: (res) => {
          console.log('微信支付失败', res);
          app.messageBox.common('请重新扫码支付！')
        },
        complete: (res) => {
          console.log('微信支付完成', res);
        }
    })
  },
  async getDetail (authCode) {
    let { result } = await outScan({
      authCode
    })
    if (result) {
      result.billingDuration = app.utils.formatHours(result.billingDuration)
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