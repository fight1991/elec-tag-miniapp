// pages/subPages/setting/trade.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    password: '',
    password2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 确认按钮
  confirmBtn () {
    let { password, password2 } = this.data
    if (!password.trim()) {
      app.messageBox.common('交易密码不能为空')
      return
    }
    if (!password2.trim()) {
      app.messageBox.common('请输入确认密码')
      return
    }
    if (password != password2) {
      app.messageBox.common('2次输入的密码不一致')
      return
    }
    // api请求
    wx.navigateBack({
      delta: 2
    })
  },
  checkChange (e) {
    this.setData({
      checked: e.detail
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