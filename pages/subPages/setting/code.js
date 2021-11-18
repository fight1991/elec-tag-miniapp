// pages/subPages/setting/code.js
var app = getApp()
const { getShortCode, checkCode } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    countDown: null,
    time: 60*1000,
    pageTo: 'trade',
    isFinish: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.countDown = this.selectComponent('.control-count-down')
    this.data.pageTo = options.page
    this.setData({
      mobile: app.globalData.userInfo.mobile || ''
    })
    this.getCode()
  },

  timeFinish () {
    // this.getCode()
    this.setData({
      isFinish: true
    })
  },
  // 获取手机号验证码
  async getCode () {
    this.setData({
      isFinish: false
    })
    let { result, other, error } = await getShortCode({
      type: 'setTradePwd',
      mobile: this.data.mobile
    })
    if (result) {
      app.messageBox.common('验证码发送成功')
      this.countDown = this.selectComponent('.control-count-down')
      this.countDown && this.countDown.reset()
      this.countDown && this.countDown.start()
    }
    if (other || error) {
      this.timer = setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1500)
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
    this.timer && clearTimeout(this.timer)
    this.countDown && this.countDown.reset()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})