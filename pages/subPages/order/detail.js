// pages/subPages/order/detail.js
var app = getApp()
const { orderDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let oderNum = options.orderNum
    if (orderNum) {
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