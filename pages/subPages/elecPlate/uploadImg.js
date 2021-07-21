// pages/elecPlate/uploadImg.js
var app = getApp()
const { evi_uploadPic, evi_getPic } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insideImage: null,
    outsideImage: null,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options
    if (id) {
      this.getImgInfo(id)
      this.data.id = id
    }
  },
  // 查询图片
  async getImgInfo (id) {
    let { result } = await evi_getPic(id)
    if (result) {
      let { insideImage, outsideImage } = result
      if (!insideImage || !outsideImage) return
      this.setData({
        insideImage,
        outsideImage
      })
    }
  },
  // 上传图片
  async uploadBtn () {
    let { insideImage, outsideImage, id } = this.data
    if (!insideImage || !outsideImage) {
      app.messageBox.common('请上传2张车辆照片')
      return
    }
    let { result } = await evi_uploadPic({
      insideImage,
      outsideImage,
      vehicleId: id
    })
    if (result) {
      app.messageBox.common('上传成功')
      // wx.navigateBack({
      //   delta: 1
      // })
      this.timer = setTimeout(() => {
        wx.reLaunch({
          url: '/pages/main/main',
        })
      }, 350)
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
    this.timer && clearTimeout(this.timer)
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