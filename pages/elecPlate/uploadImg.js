// pages/elecPlate/uploadImg.js
var app = getApp()
const { evi_uploadPic } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insideImage: null,
    outsideImage: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async uploadBtn () {
    let { insideImage, outsideImage } = this.data
    let { result } = await evi_uploadPic({
      insideImage,
      outsideImage
    })
    if (result) {
      app.messageBox.common('上传成功')
      // wx.navigateBack({
      //   delta: 1
      // })
      wx.reLaunch({
        url: '/pages/main/main',
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