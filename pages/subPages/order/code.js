// pages/subPages/order/code.js
var app = getApp()
const { payByBackSMS } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tradeOrderNo: '',
    mobile: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.tradeOrderNo = options.tradeOrderNo
    this.setData({
      mobile: app.globalData.userInfo.mobile || ''
    })
  },
  // 验证码输入完成
  async confirmCode (e) {
    let code = e.detail
    // 校验验证码成功, 跳转到设置交易密码页面
    let { result } = await payByBackSMS({
      tradeOrderNo: this.data.tradeOrderNo,
      payExt: {
        verificationCode: code
      }
    })
    if (result) {
      wx.redirectTo({
        url: `/pages/subPages/order/order`,
      })
    }
  },
  onHide () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})