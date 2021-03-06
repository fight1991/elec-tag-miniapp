// pages/card/addCard.js
var app = getApp()
const { OCR_bankCard, whichBank } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      bankCardNo: '',
      bankCardType: '', // 银行卡类型 1 储蓄 2 信用
      accountName: '',
      bankName: '',
      cvn2: '', // 安全码
      idNo: '',
      mobile: '', // 银行预留手机号
      uid: '',
      validDate: '',
      bankCode: '' // 银行代码
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
    this.mapPropsToData()
  },
  mapPropsToData () {
    let { userName, uid, idNo } = app.globalData.userInfo
    this.setData({
      'formData.accountName': userName,
      'formData.uid': uid,
      'formData.idNo': idNo
    })
  },
  bindData (e) {
    var id = e.currentTarget.id
    this.data.formData[id] = e.detail.value
    if (id == 'bankCardNo') { // 查询银行
      let value = e.detail.value
      if (value.length >= 8) {
        // 防抖
        this.bounceTimer && clearTimeout(this.bounceTimer)
        this.bounceTimer = setTimeout(() => {
          this.getBankName()
        }, 800)
      }
    }
  },
  photoBtn () {
    this.$upload.chooseBtn()
  },
  getImgInfo () {
    let { cardImage } = this.data
    if (!cardImage) return
    this.ocrCardNo(cardImage)
  },
  // 银行卡号识别
  async ocrCardNo (imgUrl) {
    let { result } = await OCR_bankCard(imgUrl)
    if (result) {
      this.setData({
        'formData.bankCardNo': result
      })
      this.getBankName()
    }
  },
  // 根据卡号查询市哪家银行
  async getBankName (other = true) {
    let { bankCardNo } = this.data.formData
    if (bankCardNo && bankCardNo.length >= 8) {
      let { result } = await whichBank(bankCardNo, other)
      if (result) {
        this.setData({
          'formData.bankName': result.bankName,
          'formData.bankCode': result.bankCode,
          'formData.bankCardType': result.cardType,
        })
      }
    }
  },
  // 下一步按钮
  nextStepBtn () {
    let { bankCardNo, bankCardType, cvn2, validDate, bankName } = this.data.formData
    if (bankCardNo.length < 8) {
      app.messageBox.common('请输入正确格式的银行卡号')
      return
    }
    if (!bankName) {
      app.messageBox.common('发卡行不能为空')
    }
    if (bankCardType==2) {
      if (!cvn2) {
        app.messageBox.common('请输入安全码')
        return
      }
      if (!validDate) {
        app.messageBox.common('请输入有效期')
        return
      }
    }
    wx.navigateTo({
      url: './check',
    })
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