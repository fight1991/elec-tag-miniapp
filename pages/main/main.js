// pages/main/main.js
var app = getApp()
const { point_list } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false, // 是否已实名认证
    bindStatus: false, // 电子车牌是否已绑定
    pagination: {
      pageIndex: 1,
      pageSize: 5
    },
    pointList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isAuth: app.globalData.userInfo.authVehicleLicense,
      bindStatus: app.globalData.elecBrandInfo.bindStatus == 'bind'
    })
    this.getCurrentPosition()
  },
  // 获取用户当前位置
  getCurrentPosition () {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        let { latitude, longitude } = res
        this.getPointList(longitude, latitude)
      }
    })
  },
  // 获取网点列表
  async getPointList (lon, lat) {
    let { result } = await point_list({
      data: {
        lat,
        lon
      },
      page: this.data.pagination
    })
    if (result) {
      this.setData({
        pointList: result
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