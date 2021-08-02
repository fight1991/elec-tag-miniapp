// pages/subPages/send/send.js
var app = getApp()
const { getParkNoticeSwitch, updateParkNoticeSwitch } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getParkNoticeSwitch()
  },
  onChange () {
    this.updateParkNoticeSwitch()
  },
  // 更新详情
  async updateParkNoticeSwitch () {
    let { info, checked } = this.data
    let { result } = await updateParkNoticeSwitch({
      ...info,
      pushFlag: !checked
    })
    if (result) {
      this.setData({
        checked: !checked
      })
    }
  },
  // 获取详情
  async getParkNoticeSwitch () {
    let { result } = await getParkNoticeSwitch()
    if (result) {
      this.data.info = result
      this.setData({
        checked: result.pushFlag
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