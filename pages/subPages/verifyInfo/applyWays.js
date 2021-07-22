// pages/verifyInfo/applyWays.js
var app = getApp()
const { selectInstallType } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options
    if (id) {
      this.data.id = id
    }
  },
  async confirmBtn () {
    let { result } = await selectInstallType({
      installation: 'branchInstall',
      vehicleId: this.data.id
    })
    if (result) {
      wx.navigateTo({
        url: '/pages/subPages/elecPlate/elecPlate?type=elec&id=' + this.data.id
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