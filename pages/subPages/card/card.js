// pages/card/card.js
var app = getApp()
const { bankCardList } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1, // 当前页
    pageSize: 20, // 每页请求数量
    total: 0, // 条目数
    cardList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // 获取银行卡列表
  async getCardList () {
    let { pageSize, pageIndex } = this.data
    let { result } = await bankCardList({
      page: {
        pageIndex,
        pageSize
      }
    })
    if (result && result.length > 0) {
      this.setData({
        cardList: result
      })
    }
    wx.stopPullDownRefresh()
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
    this.getCardList()

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
    this.getSupportBankList()
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