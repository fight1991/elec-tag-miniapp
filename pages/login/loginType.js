var app = getApp()
const { loginApiByWechat } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    jsCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    wx.showLoading()
    app.getWechatCode().then(res => {
      this.data.jsCode = res.code
      wx.hideLoading()
    }).catch(() => {
      wx.hideLoading()
    })
  },
  // 点击同意按钮
  switchAgree () {
    let { isAgree } = this.data
    this.setData({
      isAgree: !isAgree
    })
  },
  // 判断是否勾选协议
  weixinBtn () {
    let { isAgree } = this.data
    if (!isAgree) {
      app.messageBox.common('请同意用户协议') 
    }
    return isAgree
  },
  // 微信登录
  bindgetphonenumber (e) {
    let isCheck = this.weixinBtn()
    if (!isCheck) return
    this.loginByWechat(e.detail)
  },
  // 跳转到验证码登录
  codeLoginBtn () {
    let isCheck = this.weixinBtn()
    if (!isCheck) return
    wx.navigateTo({
      url: './signIn',
    })
  },
  async loginByWechat ({ encryptedData, iv }) {
    // 用户拒绝
    if (!encryptedData || !iv) return
    let { result } = await loginApiByWechat({
      jsCode: this.data.jsCode,
      wechatLogin: {
        encryptedData,
        iv
      }
    })
    if (result) {
      // 登录成功后
      app.loginSuccessToPage(result.token)
    }
  }
})