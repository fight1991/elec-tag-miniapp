// pages/subPages/order/detail.js
var app = getApp()
const { orderDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPay: false,
    formData: {},
    isFreeze: false, // 是否被冻结
    serviceText: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderNum = options.orderNum
    if (orderNum) {
      let pages = getCurrentPages()
      let prePage = pages[pages.length - 2]
      this.setData({
        serviceText: prePage.data.serviceText
      })
      this.getDetail(orderNum)
    }
  },
  // 获取详情
  async getDetail (no) {
    let { result } = await orderDetail(no)
    if (result) {
      this.setData({
        formData: {
          ...result,
          ...result.extendObject
        }
      })
    }
  },
  // 打开支付组件
  async openPayPage () {
    let { result } = await getFreezeStatus()
    if (result) {
      wx.showToast({
        title: '账户已被冻结，无法继续支付！',
        icon: 'none'
      })
      return
    }
    this.setData({
      showPay: true,
      params: this.data.formData
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