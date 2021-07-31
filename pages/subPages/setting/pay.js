// pages/subPages/setting/pay.js
var app = getApp()
const { tradePay } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: '3'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 开通
  openBtn () {
   wx.navigateBack({
     delta: 2
   })
  },
  // 关闭免密支付
  closeBtn () {
    app.utils.openConfirm({
      content: '是否关闭关闭小额免密支付',
      confirm: () => {
        wx.navigateBack({
          delta: 2
        })
      }
    })
  },
  onChange (event) {
    this.setData({
      check: event.detail
    })
  },
  onClick (event) {
    let { name } = event.currentTarget.dataset
    this.setData({
      check: name
    })
  },
  async payWithoutPw () {
    let { result } = await tradePay({
      limitAmount: '',
      openTradePwd: true,
      authCode: ''
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