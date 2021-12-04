// pages/subPages/scanIntoPlay/outDetail.js
var app = getApp()
const { orderDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgName: '',
    plateNo: '',
    tradeNo: '', 
    inDate: '', 
    outDate: '',
    status: '',
    billingDuration: '',
    totalAmount: 0,
    showPay: false, // 支付弹框
    params:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { orgName, plateNo, tradeNo, inDate, outDate, billingDuration, totalAmount, status } = JSON.parse(options.param)
    this.setData({
      orgName,
      plateNo,
      tradeNo, 
      inDate, 
      outDate,
      billingDuration,
      status,
      totalAmount
    })
  },
  // 支付金额
  async confirmPay() {
    // 支付调取订单详情接口: status='done'表明支付成功,其余情况走订单详情去支付流程
    let result = await this.getOrderDetail()
    if (result.status === 'done') {
      this.selectComponent('#goPay').goPayResult('successPay');
      this.setData({
        status: done
      })
    } else {
      this.setData({
        showPay: true
      })
      this.data.params = {
        ...result,
        ...result.extendObject
      }
    }
  },
  successPay() {
    this.setData({
      status: done
    })
  },
   // 获取订单详情
   async getOrderDetail () {
    let no = this.data.tradeNo
    let { result } = await orderDetail(no)
    if (result) {
     return result
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