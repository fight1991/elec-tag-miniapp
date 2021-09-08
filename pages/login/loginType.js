var app = getApp()
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
    if (!isAgree) return

    // 登录成功后
    // app.loginSuccessToPage()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})