// pages/card/addCard.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      vehicleType: '2442',
      uid: '',
      userName: ''
    },
    cardImage: '',
    hiddenDateCase: true,
    hiddenCodeCase: true,
    safeCodeImg: '/pages/image/card-safecode.png', // 安全码说明
    safeDateImg: '/pages/image/card-date.png' // 有效期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindData (e) {
    var id = e.currentTarget.id
    this.data.licenseInfo[id] = e.detail.value
  },
  photoBtn () {
    this.$upload.chooseBtn()
    let { cardImage } = this.data
    if (!cardImage) return

  },
  // 银行卡号识别
  ocrCardNo () {
    
  },
  // 下一步按钮
  nextStepBtn () {

  },
  openDateCase () {
    this.setData({
      hiddenDateCase: false
    })
  },
  openCodeCase () {
    this.setData({
      hiddenCodeCase: false
    })
  },
   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.$upload = this.selectComponent('#upload')
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