var app = getApp()
const { loginApiByWechat } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击同意按钮
  switchAgree () {
    let { isAgree } = this.data
    this.setData({
      isAgree: !isAgree
    })
  },
  bindgetphonenumber (e) {
    let { isAgree } = this.data
    if (!isAgree) {
      app.messageBox.common('请同意用户协议')
      return
    }
    this.loginByWechat(e.detail)
  },
  async loginByWechat ({ encryptedData, iv }) {
    let { result } = await loginApiByWechat({
      jsCode: app.globalData.jsCode,
      wechatLogin: {
        encryptedData,
        iv
      }
    })
    if (result) {
      // 登录成功后
      app.loginSuccessToPage(result.token)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})