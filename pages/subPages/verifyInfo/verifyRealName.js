// pages/verifyInfo/verifyRealName.js
var app = getApp()
const { verifyAuth } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idName: '',
    idNo: '',
    idcardInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initIdcardInfo()
  },
  // 身份证号正则校验
  checkIdcard (value) {
    var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    return reg.test(value)
  },
  // 读取ocr识别页面idcardVerify的信息
  initIdcardInfo () {
    let pages = getCurrentPages()
    let prePage = pages[pages.length - 2]
    if (prePage) {
      let idcardInfo = prePage.data.verifyInfo
      this.setData({
        idName: idcardInfo.idName || '',
        idNo: idcardInfo.idNo || ''
      })
      this.data.idcardInfo = idcardInfo
    }
  },
  // 提交认证
  async sumitBtn () {
    let { idName, idNo } = this.data
    if (!idName) {
      app.messageBox.common('姓名不能为空')
      return
    }
    if (!this.checkIdcard(idNo)) {
      app.messageBox.common('请输入正确的身份证号')
      return
    }
    let { result } = await verifyAuth({
      ...this.data.idcardInfo
    })
    if (result) {
      app.globalData.userInfo.authPersonal = true
      app.globalData.userInfo.userName = idName
      app.messageBox.success('实名认证成功')
      wx.navigateBack({
        delta: 2
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