// pages/subPages/refuel/oilDetail.js
var app = getApp()
const { oilDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTop: 0,
    navHeight: 0,
    selection: ['92#', '95#', '98#', '0#'],
    selectionIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initTopHeight()
  },
  // 初始化状态栏的高度
  initTopHeight () {
    this.setData({
      navTop: app.navTop,
      navHeight: app.navHeight
    })
  },
  // 打开选择油号面板
  showSheet () {
    wx.showActionSheet({
      itemList: this.data.selection,
      success: res => {
        if (res.cancel) return
        if (res.tapIndex == this.data.selectionIndex) return
        this.setData({
          selectionIndex: res.tapIndex
        })
      }
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