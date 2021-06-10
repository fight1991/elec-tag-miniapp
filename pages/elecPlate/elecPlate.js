// pages/elecPlate/elecPlate.js
var app = getApp()
const { evi_bind, evi_info } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: '/pages/image/bind-bg.png',
    elecInfo: {},
    type: 'base'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getElecInfo()
    let { type } = options
    if (type) {
      this.setData({
        type
      })
    }
  },
  // 绑定电子车牌按钮
  bindBtn () {
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        // res.result
        wx.navigateTo({
          url: '/pages/scanBind/scanBind?plateNo=' + res.result,
        })
      }
    })
  },
  // 点击tab
  tabClick (e) {
    let type = e.target.dataset.type
    if (this.data.type == type) return
    this.setData({
      type
    })
    this.initList()
  },
  // 获取电子车牌信息
  async getElecInfo () {
    let { result } = await evi_info()
    if (result) {
      this.setData({
        elecInfo: result[0]
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