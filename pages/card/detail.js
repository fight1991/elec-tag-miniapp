// pages/card/detail.js
var app = getApp()
const {bankCardDetail, bankCardUnbind} = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      bankCardNo: '',
      bankCardType: '',
      bankName: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options
    id && this.getDetail(id)
  },
  // 获取详情
  async getDetail (id) {
    let { result } = await bankCardDetail(id)
    if (result) {
      this.setData({
        formData: result
      })
    }
  },
  // 解除绑定
  async unbindBtn () {
    let { result } = await bankCardUnbind(this.data.formData.accountId)
    if (result) {
      app.messageBox.common('操作成功')
      wx.navigateBack({
        delta: 1
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