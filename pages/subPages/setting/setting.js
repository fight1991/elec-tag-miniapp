// pages/subPages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      url: './code?page' + 'pay',
    })
  },
  // 扣款顺序
  descBtn () {
    wx.navigateTo({
      url: './orderBy/index',
    })
  }
})