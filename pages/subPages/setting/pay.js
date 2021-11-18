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
    let { limitAmount, quickPay } = app.globalData.userInfo
    console.log('limitAmount', limitAmount);
    console.log('quickPay', quickPay);
    
    this.setData({
      check: quickPay ? limitAmount : 500,
      isOpen: quickPay
    })
  },
  // 开通
  openBtn () {
    this.payWithoutPw(true)
  },
  // 关闭免密支付
  closeBtn () {
    app.utils.openConfirm({
      content: '是否关闭小额免密支付',
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
      quickPay: status,
      authCode: this.data.code
    })
    if (result) {
      app.globalData.userInfo.quickPay = status
      app.globalData.userInfo.limitAmount = this.data.check
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