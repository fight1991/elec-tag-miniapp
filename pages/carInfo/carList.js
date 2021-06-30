// pages/carInfo/carList.js
var app = getApp()
const { getCarList, deleteCar } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgObj: {
      bind: app.utils.imgTobase64('/pages/image/bind-bg.png'),
      apply: app.utils.imgTobase64('/pages/image/bind-bg.png'),
      unbind: app.utils.imgTobase64('/pages/image/bind-bg-disable.png')
    },
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  // 列表查询
  async getList () {
    let { result } = await getCarList()
    if (result) {
      this.setData({
        list: result
      })
    }
    wx.stopPullDownRefresh()
  },
  // 列表删除
  async deleteCar (id) {
    let { result } = await deleteCar(id)
    if (result) {
      app.messageBox.common('删除成功')
      this.getList()
    }
    wx.stopPullDownRefresh()
  },
  showSheet (e) {
    let id = e.currentTarget.id
    wx.showActionSheet({
      itemList: ['删除'],
      success: (res) => {
        if (!res.cancel) {
          this.deleteCar(id)
        }
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
    this.getList()
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