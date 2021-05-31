// pages/verifyInfo/verifyLicense.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorMap: {
      blue: '蓝',
      green: '绿',
      yellow: '黄',
      other: '黄绿'
    },
    currentColor: 'blue',
    frontImgUrl: null,
    backImgUrl: null,
    licenseInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseColor (e) {
    var color = e.target.dataset.color
    this.setData({
      currentColor: color
    })
  },
  // 表单方法区域
  bindData (e) {
    var id = e.currentTarget.id
    this.data.licenseInfo[id] = e.detail.value
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