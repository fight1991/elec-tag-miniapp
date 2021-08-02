// pages/subPages/setting/code.js
var app = getApp()
const { getShortCode, checkCode } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    cutDown: 0,
    time: 60*1000,
    pageTo: 'trade',
    openTime: false // 是否开启倒计时
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.pageTo = options.page
    this.setData({
      mobile: app.globalData.userInfo.mobile || ''
    })
    this.getCode()
  },
  timeFinish () {
    this.getCode()
  },
  // 获取手机号验证码
  async getCode () {
    let { result } = getShortCode({
      type: 'setTradePwd',
      mobile: this.data.mobile
    })
    if (result) {
      app.messageBox.common('验证码发送成功')
      this.setData({
        openTime: true
      })
    }
  },
  // 验证码输入完成
  async confirmCode (e) {
    let code = e.detail
    // 校验验证码成功, 跳转到设置交易密码页面
    let { result } = await checkCode({
      code,
      mobile: this.data.mobile,
      type: 'setTradePwd'
    })
    if (result) {
      wx.redirectTo({
        url: `./${this.data.pageTo}?code=${code}`,
      })
    }
  },
  onHide () {
    // this.setData({
    //   openTime: false,
    //   item: 60*1000
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})