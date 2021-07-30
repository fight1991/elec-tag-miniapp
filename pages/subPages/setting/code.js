// pages/subPages/setting/code.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    cutDown: 0,
    time: 60*1000,
    pageTo: 'trade',
    openTime: true // 是否开启倒计时
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.pageTo = options.page
    this.setData({
      mobile: app.globalData.userInfo.mobile || ''
    })
  },
  timeFinish () {

  },
  // 验证码输入完成
  confirmCode (e) {
    let code = e.detail
    // 校验验证码成功, 跳转到设置交易密码页面
    wx.navigateTo({
      url: `./${this.data.pageTo}`,
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