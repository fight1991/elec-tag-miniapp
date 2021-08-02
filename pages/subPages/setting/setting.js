// pages/subPages/setting/setting.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openTradePwd: false, // 是否设置了交易密码
    limitAmount: 0, // 免密支付金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    this.mapPorpsToData()
  },
  mapPorpsToData () {
    let { userInfo } = app.globalData
    this.setData({
      openTradePwd: userInfo.openTradePwd || false,
      limitAmount: userInfo.limitAmount || 0
    })
  },
  // 设置交易密码
  setPwBtn () {
    wx.navigateTo({
      url: './code?page=' + 'trade',
    })
  },
  // 免密支付按钮
  openLittleBtn () {
    wx.navigateTo({
      url: './code?page=' + 'pay',
    })
  },
  // 扣款顺序
  descBtn () {
    wx.navigateTo({
      url: './orderBy/index',
    })
  }
})