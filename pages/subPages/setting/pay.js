// pages/subPages/setting/pay.js
var app = getApp()
const { tradePay } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: 500,
    code: '',
    isOpen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.code = options.code
  },
  mapPropsData () {
    let limitAmount = app.globalData.userInfo.limitAmount
    this.setData({
      check: limitAmount > 0 ? limitAmount : 500,
      isOpen: limitAmount > 0
    })
  },
  // 开通
  openBtn () {
    this.payWithoutPw(true)
  },
  // 关闭免密支付
  closeBtn () {
    app.utils.openConfirm({
      content: '是否关闭关闭小额免密支付',
      confirm: () => {
        this.payWithoutPw(false)
      }
    })
  },
  onClick (event) {
    let { name } = event.currentTarget.dataset
    this.setData({
      check: name
    })
  },
  async payWithoutPw (status) {
    let { result } = await tradePay({
      limitAmount: this.data.check,
      openTradePwd: status,
      authCode: this.data.code
    })
    if (result) {
      app.globalData.userInfo.limitAmount = this.data.check
      if (!status) {
        app.globalData.userInfo.limitAmount = 0
      }
      wx.navigateBack({
        delta: 1
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.mapPropsData()
  }
})